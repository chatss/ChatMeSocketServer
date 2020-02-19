import app from "../app";
import http from "http";
import SocketIOStatic from "socket.io";
import { info, log } from "console";
import { disconnect } from "cluster";
import redis from "socket.io-redis";
import ioRedis from "ioredis";

const ioredis = new ioRedis();
const server = new http.Server(app);
const io = SocketIOStatic(server);
const port = process.env.PORT || 6003;

io.adapter(redis({ host: "localhost", port: 6379 }));

var numUsers = 0;

io.on("connection", (socket: any) => {
    var addedUser = false;
    log("connect");
    // when the client emits 'new message', this listens and executes
    socket.on("new message", (RoomName: string, data: any) => {
        ioredis.sadd(`Room-${RoomName}`, `${socket.username}-${data}`);
        // we tell the client to execute 'new message'
        socket.join(RoomName, () => {
            io.to(RoomName).emit("new message", {
                username: socket.username,
                message: data,
            });
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on("add user", (RoomName: string, username: any) => {
        socket.join(RoomName, () => {
            if (addedUser) return;

            // we store the username in the socket session for this client
            socket.username = username;
            ++numUsers;
            addedUser = true;
            socket.emit("login", {
                numUsers: numUsers,
            });
            // echo globally (all clients) that a person has connected
            io.to(RoomName).emit("user joined", {
                username: socket.username,
                numUsers: numUsers,
            });
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on("typing", (RoomName: string) => {
        socket.join(RoomName, () => {
            io.to(RoomName).emit("typing", {
                username: socket.username,
            });
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on("stop typing", (RoomName: string) => {
        socket.join(RoomName, () => {
            io.to(RoomName).emit("stop typing", {
                username: socket.username,
            });
        });
    });

    // when the user disconnects.. perform this
    socket.on("disconnect", (RoomName: string) => {
        socket.leave(RoomName, () => {
            if (addedUser) {
                --numUsers;

                // echo globally that this client has left
                io.to(RoomName).emit("user left", {
                    username: socket.username,
                    numUsers: numUsers,
                });
            }
        });
    });
});

(async () => {
    server.listen(port, () => info(`Server running on port ${port}`));
})();

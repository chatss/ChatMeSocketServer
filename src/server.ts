import app from "./app";
import http from "http";
import SocketIOStatic from "socket.io";
import { info, log } from "console";
import { disconnect } from "cluster";

const server = new http.Server(app);
const io = SocketIOStatic(server);
const port = process.env.PORT || 6003;

// app.set("io", io);
// const PrivateRoom = io.of("/PrivateRoom");
// const PublicRoom = io.of("/PublicRoom");

io.on("connection", (socket) => {
    log("User is connected in io");

    socket.on("chat message", (msg) => {
        log("User sent a message : ", msg);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        log("User is disconnected in io");
    });
});

// PrivateRoom.on("connection", (socket) => {
//     log("User is connected in PrivateRomm");

//     socket.on("chat message", (msg) => {
//         io.emit("chat message", msg);
//     });

//     socket.on("disconnect", () => {
//         log("User is disconnected in PrivateRomm");
//     });
// });
// PublicRoom.on("connection", (socket) => {
//     log("User is connected in PublicRoom");

//     socket.on("chat message", (msg) => {
//         io.emit("chat message", msg);
//     });

//     socket.on("disconnect", () => {
//         log("User is disconnected in PublicRoom");
//     });
// });

(async () => {
    server.listen(port, () => info(`Server running on port ${port}`));
})();

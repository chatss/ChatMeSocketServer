import app from "./app";
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

const dynamicNsp = io.of(/^\/server-.+$/).on("connect", (socket) => {
    const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
    // broadcast to all clients in the given sub-namespace
    newNamespace.emit("hello");
});

dynamicNsp.on("connection", (socket) => {
    log("namespace : " + socket.nsp.name);
});

(async () => {
    server.listen(port, () => info(`Server running on port ${port}`));
})();

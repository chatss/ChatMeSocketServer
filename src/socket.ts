import app from "./app";
import http from "http";
import SocketIOStatic from "socket.io";
import { info, log } from "console";
import redis from "socket.io-redis";
import ioRedis from "ioredis";
import { disconnect } from "cluster";

const ioredis = new ioRedis();
let x = 0;
const websocket = (app: any, server: any) => {
    const io = SocketIOStatic(server);
    app.set("io", io);
    io.adapter(redis({ host: "localhost", port: 6379 }));

    const dynamicNsp = io.of(/^\/server-.+$/);

    dynamicNsp.on("connect", (socket) => {
        const newNamespace = socket.nsp; // newNamespace.name === '/server-101'
        log(socket.nsp.name + x + " connected");
        const req = socket.request;
        const {
            headers: { origin },
        } = req;
        const roomId = origin.split("/")[origin.split("/").length - 1].replace(/\?.+/, "");
        log(roomId);
        socket.join(roomId);

        socket.on("new message", (msg: any) => {
            log("server recived: " + msg);
            socket.emit("new message", "server received some message");
            log("server sending a message to room0");
            dynamicNsp.to("room0").emit("new message", "i received your message");
        });

        socket.on("disconnect", () => {
            log(socket.nsp.name + " disconnect");
        });
    });
};

export default websocket;

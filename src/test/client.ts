import io from "socket.io-client";
import { log } from "console";
const socket = io.connect("http://localhost:6003/server-88HC6ppWD6HovTJ583ipkW2RndRMcWb+y9d+o9sLiaw=");

socket.on("connection", function() {
    log("connection");
});
socket.on("new message", (msg: any) => {
    log("client received: " + msg);
});
socket.on("disconnect", function() {
    log("disconnect");
});
socket.emit("new message", "hi server? im client");

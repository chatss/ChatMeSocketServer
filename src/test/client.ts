import io from "socket.io-client";
import { log } from "console";
const socket = io.connect("http://192.168.90.200:6003/server-88HC6ppWD6HovTJ583ipkW2RndRMcWb+y9d+o9sLiaw=");

socket.on("connection", function() {
    log("connection");
});
socket.on("hello", (msg: any) => {
    log("hello");
    log(msg);
});
socket.on("disconnect", function() {
    log("disconnect");
});

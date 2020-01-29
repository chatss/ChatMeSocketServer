import SocketIOClientStatic from "socket.io-client";
import { log } from "console";
const socket = SocketIOClientStatic.connect("http://192.168.90.200:6003");

socket.on("connection", function() {
    log("connection");
});
socket.on("chat message", (msg: any) => {
    log(msg);
});
socket.on("disconnect", function() {
    log("disconnect");
});

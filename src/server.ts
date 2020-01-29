import app from "./app";
import http from "http";
import SocketIOStatic from "socket.io";
import { info } from "console";

const server = new http.Server(app);
const io = SocketIOStatic(server);
const port = process.env.PORT || 6003;

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});

(async () => {
    server.listen(port, () => info(`Server running on port ${port}`));
})();

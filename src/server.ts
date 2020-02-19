import app from "./app";
import http from "http";
import { info, log } from "console";
import websocket from "./socket";

const server = new http.Server(app);
const port = process.env.PORT || 6003;

websocket(app, server);

(async () => {
    server.listen(port, () => info(`Server running on port ${port}`));
})();

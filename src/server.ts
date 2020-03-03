import app from "./app";
import { info, log } from "console";
import websocket from "./socket";
import bootstrap from "./graphql";

const port = process.env.PORT || 6003;

(async () => {
    const apollo = await bootstrap();

    apollo.listen(6004);
    const server = await app.listen(port, () => info(`Server running on port ${port}`));

    websocket(app, server);
})();

import { ConnectionManager, getConnectionManager, Connection, ConnectionOptions, createConnection } from "typeorm";
import entities from "./entity";
import "pg"; // Crucial for postgres

export default class Database {
    connectionManager: ConnectionManager;

    constructor() {
        this.connectionManager = getConnectionManager();
    }

    async connect() {
        const password = process.env.TYPEORM_PASSWORD || "kimsky";
        if (!password) {
            throw new Error("Failed to load database password");
        }

        const connectionOptions: ConnectionOptions = {
            // name: "postgres", default*
            entities,
            password,
            type: (process.env.TYPEORM_CONNECTION as any) || "postgres",
            host: process.env.TYPEORM_HOST || "localhost",
            database: process.env.TYPEORM_DATABASE || "chatme",
            username: process.env.TYPEORM_USERNAME || "postgres",
            port: parseInt(process.env.TYPEORM_PORT || "5432", 10),
            synchronize: true,
            appname: "ChatMe",
        };

        return createConnection(connectionOptions);
    }

    async getConnection(): Promise<Connection> {
        const CONNECTION_NAME = "default";
        if (this.connectionManager.has(CONNECTION_NAME)) {
            const connection = this.connectionManager.get(CONNECTION_NAME);
            try {
                if (connection.isConnected) {
                    await connection.close();
                }
            } catch (error) {
                console.log(error);
            }
            return connection.connect();
        }

        return this.connect();
    }
}

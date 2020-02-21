import { buildSchema } from "type-graphql";
// import { ApolloServer } from "apollo-server-express";
import { ApolloServer } from "apollo-server";

import Database from "./database";

const database = new Database();
const LoggingExtension = require("./logging");

async function bootstrap() {
    const connection = await database.getConnection();
    // await connection.dropDatabase();
    const schema = await buildSchema({
        resolvers: [__dirname + "/resolver/**.resolver.ts"],
    });

    // Create GraphQL server
    const server = await new ApolloServer({
        schema,
        playground: {
            settings: {
                "editor.theme": "light",
            },
        },
        extensions: [() => new LoggingExtension()],
    });

    return server;
}

export default bootstrap;

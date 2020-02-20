import { buildSchema } from "type-graphql";
// import { ApolloServer } from "apollo-server-express";
import { ApolloServer } from "apollo-server";

import Database from "./database";
const database = new Database();

async function bootstrap() {
    const connection = await database.getConnection();

    const schema = await buildSchema({
        resolvers: [__dirname + "/resolver/user.resolver.ts"],
    });

    // Create GraphQL server
    const server = await new ApolloServer({
        schema,
        playground: {
            settings: {
                "editor.theme": "light",
            },
        },
    });

    return server;
}

export default bootstrap;

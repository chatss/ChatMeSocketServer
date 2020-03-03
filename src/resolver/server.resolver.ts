import { Resolver, Query, Mutation, Args, Arg } from "type-graphql";
import Server from "../entity/Server";
import User from "../entity/User";
import crypto from "crypto";
@Resolver()
export class ServerResolver {
    @Query(() => [Server])
    async servers() {
        return await Server.find();
    }

    @Mutation(() => String)
    async createServer(@Arg("name") name: string, @Arg("owner") owner: string) {
        try {
            const UserDBO = await User.findOne({ where: { id: owner } });
            const hash = crypto
                .createHash("sha256")
                .update(new Date().toString())
                .digest("base64");
            await Server.insert({
                name,
                namespace: hash,
                Owner: UserDBO,
            });
            return hash;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    @Mutation(() => Server)
    async joinServer(@Arg("nsp") nsp: string) {
        try {
            const ServerDBO = await Server.findOne({ where: { namespace: nsp } });
            return ServerDBO;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    @Query(() => [Server])
    async myServer(@Arg("id") id: string) {
        try {
            const ServerDBO = await Server.find({
                where: { Owner: id },
            });
            console.log(ServerDBO);
            return ServerDBO;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    @Query(() => [Server])
    async myjoinServer(@Arg("id") id: string) {
        try {
            const ServerDBO = await Server.find({
                relations: ["server.serverId"],
                join: {
                    alias: "server",
                    innerJoinAndSelect: {},
                },
                // where: { Member: { id } },
            });
            console.log(ServerDBO);
            return ServerDBO;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
}

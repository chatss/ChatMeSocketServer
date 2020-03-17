import { Resolver, Query, Mutation, Args, Arg, FieldResolver } from "type-graphql";
import Server from "../entity/Server";
import User from "../entity/User";
import crypto from "crypto";
import { createQueryBuilder, getManager, getRepository, Any } from "typeorm";
@Resolver()
export class ServerResolver {
    @Query(() => [Server])
    async servers() {
        console.log(await Server.find());
        return await Server.find();
    }

    @Mutation(() => Server)
    async createServer(@Arg("name") name: string, @Arg("owner") owner: string) {
        try {
            const UserDBO = await User.findOne({ where: { id: owner } });
            const hash = crypto
                .createHash("sha256")
                .update(new Date().toString())
                .digest("base64");
            const ServerDBI = Server.create({
                name,
                namespace: hash,
                members: [User.create({ ...UserDBO })],
            });
            await Server.save(ServerDBI);
            return ServerDBI;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    @Mutation(() => Server)
    async joinServer(@Arg("nsp") nsp: string, @Arg("member") member: string) {
        try {
            const ServerDBO = await Server.findOne({ where: { namespace: nsp } });
            const UserDBO = await User.findOne({ where: { id: member } });
            const UserDBI = User.create({ ...UserDBO });
            ServerDBO!.members!.push(UserDBI);
            const ServerDBI = Server.create({ ...ServerDBO });
            console.log(ServerDBI);
            await Server.save(ServerDBI);
            return ServerDBI;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    @Query(() => [Server])
    async myServers(@Arg("id") id: string) {
        try {
            const ServerDBO = await getRepository(Server)
                .createQueryBuilder("server")
                .leftJoinAndSelect("server.members", "users")
                .getMany();
            // const ServerDBO = await Server.find({
            //     // relations: ["User"],
            //     join: {
            //         alias: "S",
            //         leftJoinAndSelect: {
            //             s: "S.members",
            //         },
            //     },
            //     where: {
            //         fk_server_id: id,
            //     },
            // });
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

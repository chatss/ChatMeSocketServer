import { Resolver, Query, Mutation, Args, Arg, FieldResolver } from "type-graphql";
import Server from "../entity/Server";
import User from "../entity/User";
import Member from "../entity/ServerMembersUser";
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
                .digest("base64")
                .replace(/[+=]/g, "");
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

            const MemberDBI = Member.create({
                serverId: ServerDBO?.id,
                userId: UserDBO?.id,
                likedAt: new Date(),
            });
            await Member.save(MemberDBI);
            return ServerDBO;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    @Query(() => [Server])
    async myServers(@Arg("id") owner: string) {
        //* 비동기 처리 추후 문제 가능
        try {
            const MemberDBO = await Member.find({
                where: { userId: owner },
            });
            const MyServersId = MemberDBO.map((Member) => Member.serverId);
            const ServerDBO = MyServersId.map((id) => {
                return Server.findOne({ where: { id } });
            });
            return ServerDBO;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    @Mutation(() => Boolean)
    async deleteServer(@Arg("id") id: number, @Arg("owner") owner: string) {
        try {
            const ServerDBO = await Server.findOne({ where: { id } });
            const MemberDBO = await Member.find({ where: { userId: owner } });
            const valid = MemberDBO.some((Member) => {
                return Member.serverId === ServerDBO?.id;
            });
            if (valid && ServerDBO) await Server.remove(ServerDBO);
            else throw new Error("Invalid to Delete");
            return true;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }
}

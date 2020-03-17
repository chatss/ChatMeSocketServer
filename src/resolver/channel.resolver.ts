import { Resolver, Query, Mutation, Args, Arg } from "type-graphql";
import Channel from "../entity/Channel";
import Server from "../entity/Server";

@Resolver()
export class ChannelResolver {
    @Query(() => [Channel])
    async channels() {
        return await Channel.find();
    }

    @Mutation(() => Channel)
    async createChannel(
        @Arg("nsp") nsp: string,
        @Arg("owner") owner: string,
        @Arg("name") name: string,
    ) {
        try {
            const ServerDBO = await Server.findOne({ where: { namespace: nsp } });
            const ChannelDBI = Channel.create({
                name,
                serverId: ServerDBO?.id,
            });
            await Channel.save(ChannelDBI);
            return ChannelDBI;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    @Mutation(() => Boolean)
    async deleteChannel(@Arg("id") id: number) {
        try {
            const ChannelDBO = await Channel.findOne({ where: { id } });
            if (ChannelDBO) await Channel.remove(ChannelDBO);
            else throw new Error("Invalid Channel ID to delete");
            return true;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }
}

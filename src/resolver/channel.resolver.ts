import { Resolver, Query, Mutation, Args, Arg } from "type-graphql";
import Channel from "../entity/Channel";

@Resolver()
export class ChannelResolver {
    @Query(() => [Channel])
    async channels() {
        return await Channel.find();
    }
}

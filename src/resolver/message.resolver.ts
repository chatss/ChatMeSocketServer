import { Resolver, Query, Mutation, Args, Arg } from "type-graphql";
import Channel from "../entity/Channel";
import Server from "../entity/Server";

import ioRedis from "ioredis";
const redis = new ioRedis();

@Resolver()
export class MessageResolver {
    @Query(() => [String])
    async messages(@Arg("nsp") nsp: string, @Arg("channel") channel: string) {
        const result = await redis.lrange(`/server-${nsp}`, 0, 10);
        // const test = result.map((str) => JSON.parse(str));

        return result;
    }
}

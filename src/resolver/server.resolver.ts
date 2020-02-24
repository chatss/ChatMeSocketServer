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
    async createServer(@Arg("owner") owner: string) {
        try {
            const UserDBO = await User.findOne({ where: { id: owner } });
            const hash = crypto
                .createHash("sha256")
                .update(new Date().toString())
                .digest("base64");
            await Server.insert({
                name: UserDBO!.name,
                namespace: hash,
                Owner: UserDBO,
            });
            return hash;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
}

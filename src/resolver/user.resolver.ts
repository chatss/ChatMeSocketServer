import { Resolver, Query, Mutation, Args } from "type-graphql";
import User from "../entity/User";
import RegisterArgs from "./RegisterArgs";

@Resolver()
export class UserResolver {
    // @Query(() => String)
    // async hello() {
    //     return "hi";
    // }
    @Query(() => [User])
    async users() {
        return await User.find();
    }
    // @Mutation(() => Boolean)
    // async register(@Args() args: RegisterArgs) {
    //     const { password, name, email } = args;
    //     try {
    //         await User.insert({
    //             password,
    //             name,
    //             email,
    //         });
    //     } catch (err) {
    //         console.warn(err);
    //         return false;
    //     }
    //     return true;
    // }
}

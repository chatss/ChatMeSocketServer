import { Resolver, Query, Mutation, Args, Arg } from "type-graphql";
import User from "../entity/User";
import RegisterArgs from "./RegisterArgs";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async users() {
        return await User.find();
    }
    @Mutation(() => Boolean)
    async register(@Args() args: RegisterArgs) {
        const { id, password, name, email } = args;
        try {
            await User.insert({
                id,
                password,
                name,
                email,
            });
        } catch (err) {
            console.warn(err);
            return false;
        }
        return true;
    }
    @Mutation(() => Boolean)
    async changeName(@Arg("id") id: string, @Arg("name") name: string) {
        try {
            const UserDBO = await User.findOne({ where: { id } });
            UserDBO!.name = name;
            const UserDBI = User.create({ ...UserDBO });
            await User.save(UserDBI);
        } catch (err) {
            console.warn(err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    async login(@Arg("id") id: string, @Arg("password") password: string) {
        try {
            const UserDBO = await User.findOne({ where: { id } });
            if (UserDBO!.password !== password) return false;
        } catch (err) {
            console.warn(err);
            return false;
        }
        return true;
    }
}

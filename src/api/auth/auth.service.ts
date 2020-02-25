const asyncRedis = require("async-redis");
const redis = asyncRedis.createClient();
import User from "../../entity/User";

export default class AuthService {
    async duplicateCheck(id: string): Promise<void> {
        try {
            const result = await redis.get(id);
            console.log(result);
            if (result) {
                throw new Error("id exist");
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    async register(payload: any): Promise<void> {
        try {
            console.log(payload);
            const result = await redis.set(payload.id, JSON.stringify(payload));
            if (result !== "OK") {
                throw new Error("redis set now throw OK");
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    async login(payload: any): Promise<User> {
        try {
            console.log(payload.id);
            const user = await User.findOneOrFail({ where: { id: payload.id } });
            if (!user) throw new Error("not exist id");
            if (payload.password !== user!.password) throw new Error("password is wrong");
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
}

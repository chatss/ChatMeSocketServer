import Redis from "ioredis";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
const redis = new Redis(6379, "127.0.0.1");

router.get("/test", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const set = redis.set("test3", "This is test2 value");
        redis.get("test3", (err, result) => {
            console.log(set);
            res.json(result);
        });
    } catch (error) {
        error.status = 400;
        next(error);
    }
});

export default router;

import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
const asyncRedis = require("async-redis");
const redis = asyncRedis.createClient();

export const messages = async (req: Request, res: Response, next: NextFunction) => {
    const roomname = req.query.roomname;
    try {
        const result = await redis.smembers(`Room-${roomname}`);
        console.log(result);
        res.json(result);
    } catch (error) {
        error.status = 401;
        next(error);
    }
};

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username || "testuser";

    try {
        const hash = crypto
            .createHash("sha256")
            .update(new Date().toString())
            .digest("base64");

        const result = await redis.sadd(`Room-${hash}`, `${username}-has create room`);
        res.json(hash);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

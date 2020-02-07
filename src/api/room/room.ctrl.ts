import { NextFunction, Request, Response } from "express";
const asyncRedis = require("async-redis");
const redis = asyncRedis.createClient();

export const messages = async (req: Request, res: Response, next: NextFunction) => {
    const roomname = req.params.roomname;
    try {
        const result = await redis.smembers(`Room-${roomname}`);
        res.json(result);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

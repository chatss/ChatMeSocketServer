import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthService from "./auth.service";
const asyncRedis = require("async-redis");
const redis = asyncRedis.createClient();
const AuthServiceCtrl = new AuthService();
export const register = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    try {
        await AuthServiceCtrl.duplicateCheck(payload.id);
        await AuthServiceCtrl.register(payload);
        res.status(201);
        res.send({ id: payload.id });
    } catch (error) {
        error.status = 401;
        next(error);
    }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    try {
        console.log(payload);
        await AuthServiceCtrl.login(payload);
        console.log(payload);
        const accesstoken = jwt.sign(payload, "config.jwtSecret", { expiresIn: "60m" });
        req.session!.accesstoken = accesstoken;
        res.sendStatus(202);
    } catch (error) {
        error.status = 402;
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await req.session?.destroy((err) => {
            if (err) throw new Error("Not logined");
            else res.sendStatus(202);
        });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.session);
        console.log(req.sessionID);
        const result = jwt.verify(req.session!.accesstoken, "config.jwtSecret");
        res.json(result);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const profile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: any = jwt.verify(req.session!.accesstoken, "config.jwtSecret");
        const result = await redis.get(payload.id);
        res.json(result);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

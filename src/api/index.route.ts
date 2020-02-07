import Redis from "ioredis";
import { Router, Request, Response, NextFunction } from "express";
import AuthRouter from "./auth/auth.route";
import RoomRouter from "./room/room.route";

const router = Router();
const redis = new Redis(6379, "127.0.0.1");

router.use("/auth", AuthRouter);
router.use("/room", RoomRouter);

router.get("/test", async (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.key) {
        res.render("admin.html");
    } else {
        console.log("session 이 없어서 홈으로 이동");
        res.render("client.html");
    }
});
export default router;

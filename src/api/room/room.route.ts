import { Router } from "express";
import * as RoomController from "./room.ctrl";
const router = Router();

router.get("/:roomname", RoomController.messages);

export default router;

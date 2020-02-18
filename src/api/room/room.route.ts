import { Router } from "express";
import * as RoomController from "./room.ctrl";
const router = Router();

router.get("/", RoomController.messages);
router.post("/", RoomController.createRoom);

export default router;

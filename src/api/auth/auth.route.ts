import { Router } from "express";
import * as AuthController from "./auth.ctrl";
const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.delete("/logout", AuthController.logout);
router.get("/verify", AuthController.verify);
router.get("/profile", AuthController.profile);

export default router;

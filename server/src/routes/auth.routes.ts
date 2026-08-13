import express from "express";
import { loginController, registerController, verifyController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/verify", verifyController);

export default router;
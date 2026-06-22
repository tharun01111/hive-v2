import express from "express";
import { loginController, registerController } from "../controllers/auth.controller";
import { verifyToken } from "../utils/jwt";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/verify", verifyToken);

export default router;
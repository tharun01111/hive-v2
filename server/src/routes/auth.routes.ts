import express from "express";
import { loginController, registerController } from "../controllers/auth.controller";
import { verify } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";

const router = express();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/verify", verifyToken);

export default router;
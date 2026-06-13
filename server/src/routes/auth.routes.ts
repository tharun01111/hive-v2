import express, { type Request, type Response }  from "express";
import { loginController, registerController } from "../controllers/auth.controller";

const router = express();

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
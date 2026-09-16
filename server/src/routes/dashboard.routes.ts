import express from "express";
import { protect } from "../middleware/auth.middleware";
import { getDashboardStatsController } from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/stats", protect, getDashboardStatsController);

export default router;

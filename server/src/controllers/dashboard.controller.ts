import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import * as dashboardService from "../services/dashboard.service";

export const getDashboardStatsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;

  if (!userId)
    return res.status(401).json({ success: false, message: "Unauthorized" });

    console.log(`[DASHBOARD_GET_STATS_ATTEMPT] userId: ${userId}`);
  try {
    const result = await dashboardService.getStats(userId);

    console.log(`[DASHBOARD_GET_STATS_SUCCESS] userId: ${userId}`);
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.log(`[DASHBOARD_GET_STATS_FAILED] userId: ${userId}`);
    console.error("Error in dashboardStatsController: ", error);
    next(error);
  }
};

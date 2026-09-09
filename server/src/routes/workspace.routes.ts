import express from "express";
import { protect } from "../middleware/auth.middleware";
import {
  createWorkspaceController,
  deleteWorkspaceController,
  getUserWorkspacesController,
  getWorkspaceController,
} from "../controllers/workspace.controller";

const router = express.Router();

router.get("/", protect, getUserWorkspacesController);
router.get("/:workspaceId", protect, getWorkspaceController);
router.post("/", protect, createWorkspaceController);
router.delete("/:workspaceId", protect, deleteWorkspaceController);

export default router;

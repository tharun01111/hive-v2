import express from "express";
import { protect } from "../middleware/auth.middleware";
import { createWorkspaceController, deleteWorkspaceController, getUserWorkspacesController } from "../controllers/workspace.controller";

const router = express.Router();

router.get("/", protect, getUserWorkspacesController);
router.post("/", protect, createWorkspaceController);
router.delete("/:workspaceId", protect, deleteWorkspaceController)

export default router;
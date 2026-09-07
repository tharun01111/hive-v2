import express from "express";
import { protect } from "../middleware/auth.middleware";
import { createProjectController, deleteProjectController, getProjectByIdController, getUserProjectsController } from "../controllers/project.controller";

const router = express.Router({
  mergeParams: true
});

//Get every project
router.get("/", protect, getUserProjectsController);
//Get a project by Id
router.get("/:projectId", protect, getProjectByIdController);
router.post("/", protect, createProjectController);
router.delete("/:projectId", protect, deleteProjectController);

export default router;
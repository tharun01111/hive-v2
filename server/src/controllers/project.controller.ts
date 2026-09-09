import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import * as projectService from "../services/project.service";
import * as workspaceService from "../services/workspace.service";
import type { ProjectVisibility } from "@prisma/client";

export type CreateProjectBody = {
  userId: number;
  workspaceId: string;
  name: string;
  description?: string;
  visibility?: ProjectVisibility;
};

export const getUserProjectsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;
  const { workspaceId } = req.params;

  const requestedWorkspaceId = String(workspaceId);

  if (!userId)
    return res.status(401).json({ success: false, message: "Unauthorised" });

  if (!workspaceId)
    return res
      .status(404)
      .json({ success: false, message: "Workspace not found" });

  console.log(
    `[GET_PROJECTS_ATTEMPT] userId: ${userId} workspaceId: ${requestedWorkspaceId}`,
  );
  try {
    await workspaceService.requireWorkspaceAccess(userId, requestedWorkspaceId);

    const result = await projectService.getUserProjects(
      userId,
      requestedWorkspaceId,
    );

    console.log(
      `[GET_PROJECTS_SUCCESS] userId: ${userId} workspaceId: ${requestedWorkspaceId}`,
    );
    res.status(200).json({ success: true, projects: result });
  } catch (error) {
    console.error("Error in projectController", error);
    console.log(`[GET_PROJECTS_FAILED] userId: ${userId}`);
    next(error);
  }
};

export const createProjectController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;
  const { workspaceId } = req.params;

  const { name, description, visibility } = req.body as CreateProjectBody;
  const requestedWorkspaceId = String(workspaceId);

  if (!userId)
    return res.status(401).json({ success: false, message: "Unauthorised" });

  if (!workspaceId) {
    return res
      .status(403)
      .json({ success: false, message: "Workspace not found" });
  }

  console.log(
    `[CREATE_PROJECT_ATTEMPT] userId: ${userId} workspaceId: ${requestedWorkspaceId}`,
  );

  try {
    const result = await projectService.createUserProject({
      userId,
      name,
      description,
      visibility,
      workspaceId: requestedWorkspaceId,
    });

    console.log(
      `[CREATE_PROJECT_SUCCESS] userId: ${userId} workspaceId: ${requestedWorkspaceId}`,
    );
    return res.status(201).json({ success: true, project: result });
  } catch (error) {
    console.error("Error in createProjectController: ", error);
    console.log(
      `[CREATE_PROJECT_FAILED] userId: ${userId} workspaceId: ${requestedWorkspaceId}`,
    );
    next(error);
  }
};

export const deleteProjectController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { projectId, workspaceId } = req.params;
  const userId = req.user?.id;
  const requestedWorkspaceId = String(workspaceId);
  const requestedProjectId = String(projectId);

  if (!userId)
    return res.status(401).json({ success: false, message: "Unauthorised" });

  if (!requestedProjectId || !requestedWorkspaceId)
    return res
      .status(403)
      .json({ success: false, message: "Project or workspace is not found" });

  console.log(
    `[DELETE_PROJECT_ATTEMPT] userId: ${userId} projectId: ${requestedProjectId}`,
  );

  try {
    const result = await projectService.deleteUserProject(
      userId,
      requestedWorkspaceId,
      requestedProjectId,
    );

    console.log(
      `[DELETE_PROJECT_SUCCESS] userId: ${userId} projectId: ${requestedProjectId}`,
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in deleteProjectController: ", error);
    console.log(
      `[DELETE_PROJECT_FAILED] userId: ${userId} projectId: ${requestedProjectId}`,
    );
    next(error);
  }
};

export const getProjectByIdController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { workspaceId, projectId } = req.params;
  const userId = req.user?.id;
  const requestedProjectId = String(projectId);
  const requestedWorkspaceId = String(workspaceId);

  if (!userId)
    return res.status(401).json({ success: false, message: "Unauthorised" });

  if (!projectId)
    return res
      .status(403)
      .json({ success: false, message: "ProjectId not found" });

  console.log(
    `[GET_PROJECT_BY_ID_ATTEMPT] userId: ${userId} projectId: ${requestedProjectId}`,
  );

  try {
    const result = await projectService.getUserProjectById(
      userId,
      requestedWorkspaceId,
      requestedProjectId,
    );

    console.log(
      `[GET_PROJECT_BY_ID_SUCCESS] userId: ${userId} projectId: ${requestedProjectId}`,
    );
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error in getProjectByIdController: ", error);
    console.log(
      `[GET_PROJECT_BY_ID_FAILED] userId: ${userId} projectId: ${requestedProjectId}`,
    );
    next(error);
  }
};

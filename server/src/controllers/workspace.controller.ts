import type { NextFunction, Response } from "express";
import { type AuthRequest } from "../middleware/auth.middleware";
import * as workspaceService from "../services/workspace.service";

//Get all workspaces
export const getUserWorkspacesController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;
  if (!userId)
    return res.status(401).json({ success: false, message: "Unauthorised" });
  console.log(`[GET_WORKSPACES_ATTEMPT] User id: ${userId}`);
  try {
    const result = await workspaceService.getUserWorkspaces(userId);
    console.log(`[GET_WORKSPACES_SUCCESS] User id: ${userId}`);

    return res.status(200).json({ success: true, workspaces: result });
  } catch (err) {
    console.log(`[GET_WORKSPACES_FAILED] User id: ${userId}`);
    console.error("Error in workspaces contrller: ", err);
    next(err);
  }
};

export const createWorkspaceController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;
  console.log(`[CREATE_WORKSPACE_ATTEMPT] userId: ${userId}`);
  const { name, description } = req.body;
  if (!userId) {
    console.log(`[CREATE_WORKSPACE_FAILED] userId: ${userId}`);
    return res.status(401).json({ success: false, message: "Unauthorised" });
  }

  try {
    const result = await workspaceService.createWorkspace({
      userId,
      name,
      description,
    });

    console.log(
      `[CREATE_WORKSPACE_SUCCESS] userId: ${userId} workspaceId: ${result.id}`,
    );
    return res.status(201).json({ success: true, ...result });
  } catch (error) {
    console.log(`[CREATE_WORKSPACE_FAILED] userId: ${userId}`);
    console.error("Error in createWorkspace controller: ", error);
    next(error);
  }
};

export const deleteWorkspaceController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.id;
  console.log(`[DELETE_WORKSPACE_ATTEMPT] userId: ${userId}`);

  const workspaceId = String(req.params.workspaceId);

  if (!userId) {
    console.log(`[DELETE_WORKSPACE_FAILED] workspaceId: ${workspaceId}`);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorised delete request" });
  }

  if (!workspaceId) {
    console.log(`[DELETE_WORKSPACE_FAILED] userId: ${userId}`);
    return res
      .status(401)
      .json({ success: false, message: "Invalid delete request" });
  }

  try {
    const result = await workspaceService.deleteWorkspace(userId, workspaceId);
    return res
      .status(200)
      .json({
        ...result,
        message: `Successfully deleted workspace: ${workspaceId}`,
      });
  } catch (error) {
    console.log(
      `[DELETE_WORKSPACE_FAILED] userId: ${userId} workspaceId: ${workspaceId}`,
    );
    console.error("Error in createWorkspace controller: ", error);
    next(error);
  }
};

//Get specific workspace
export const getWorkspaceController = async (
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
    `[GET_WORKSPACE_BY_ID_ATTEMPT] userId: ${userId} workspaceId: ${requestedWorkspaceId}`,
  );

  try {
    const result = await workspaceService.getWorkspaceById({
      userId,
      workspaceId: requestedWorkspaceId,
    });

    console.log(
      `[GET_WORKSPACE_BY_ID_SUCCESS] userId: ${userId} workspaceId: ${requestedWorkspaceId}`,
    );
    return res.status(200).json({ success: true, workspace: result });
  } catch (error) {
    console.error("Error in getUserWorkspaceControllerById: ", error);
    console.log(
      `[GET_WORKSPACE_BY_ID_FAILED] userId: ${userId} workspaceId: ${requestedWorkspaceId}`,
    );
    next(error);
  }
};

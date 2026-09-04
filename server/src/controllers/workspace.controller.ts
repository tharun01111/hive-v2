import type { NextFunction, Response } from "express";
import { type AuthRequest } from "../middleware/auth.middleware";
import * as workspaceService from "../services/workspace.service";

export const getUserWorkspacesController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id
  if(!userId)
    return res.status(401).json({ success: true, message: "Unauthorised" });
  console.log(`[GET_WORKSPACES_ATTEMPT] User id: ${userId}`);
  try{
    const result = await workspaceService.getUserWorkspaces(userId);
    console.log("result: ", result);

    return res.status(200).json({ success: true, workspaces: result });
  } catch (err) {
      console.log(`[GET_WORKSPACES_FAILED] User id: ${userId}`);
      console.error("Error in workspaces contrller: ", err);
      next(err);
  }
}

export const createWorkspaceController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const id = req.user?.id;
  console.log(`[CREATE_WORKSPACE_ATTEMPT] userId: ${id}`);4
  const { name, description } = req.body;
  console.log("workspace name: ", name);
  if(!id) {
    console.log(`[CREATE_WORKSPACE_FAILED] userId: ${id}`);
    return res.status(401).json({ success: false, message: "Unauthorised" });
  }

  try {

    const result = await workspaceService.createWorkspace(id, name, description);

    console.log(`[CREATE_WORKSPACE_SUCCESS] userId: ${id} workspaceId: ${result.id}`);
    return res.status(201).json({ success: true, ...result });

  } catch (error) {
    console.log(`[CREATE_WORKSPACE_FAILED] userId: ${id}`);
    console.error("Error in createWorkspace controller: ", error);
    next(error);
  }
}

export const deleteWorkspaceController = async (req: AuthRequest, res: Response, next: NextFunction) => { 
  const id = req.user?.id;
  console.log(`[DELETE_WORKSPACE_ATTEMPT] userId: ${id}`);

  const workspaceId = String(req.params.workspaceId);

  if(!id) {
    console.log(`[DELETE_WORKSPACE_FAILED] workspaceId: ${workspaceId}`);
    return res.status(401).json({ success: false, message: "Unauthorised delete request" });
  }

  if(!workspaceId) {
    console.log(`[DELETE_WORKSPACE_FAILED] userId: ${id}`);
    return res.status(401).json({ success: false, message: "Invalid delete request" });
  }

  try {
    const result = await workspaceService.deleteWorkspace(id, workspaceId);  
    return res.status(200).json({ ...result, message: `Successfully deleted workspace: ${workspaceId}` });
  } catch (error) {
    console.log(`[DELETE_WORKSPACE_FAILED] userId: ${id} workspaceId: ${workspaceId}`);
    console.error("Error in createWorkspace controller: ", error);
    next(error);
  }

}
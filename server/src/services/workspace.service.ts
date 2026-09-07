import { AppError } from "../errors/AppError";
import * as workspaceRepository from "../repository/workspace.repository";
import { WorkspaceRole } from "@prisma/client";

export const getUserWorkspaces = async (userId: number) => {
  const workspaces = await workspaceRepository.findWorkspacesByUserId(userId);
  return workspaces;
}

export const createWorkspace = async ({ userId, name, description }: { userId: number; name: string; description?: string }) => {
  const result = await workspaceRepository.createWorkspace(userId, name, description);
  return result;
}

export const deleteWorkspace = async (userId: number, workspaceId: string): Promise<{success: boolean}> => {

  const member = await workspaceRepository.findMember(userId, workspaceId);

  if(!member) {
    throw new AppError("User is not a part of the workspace", 403);
  }

  if(member.role !== WorkspaceRole.OWNER) {
    throw new AppError("Only the workspace owner can delete it", 403);
  }

  await workspaceRepository.deleteWorkspaceById(workspaceId);
  return {
    success: true
  };
}

export const requireWorkspaceAccess = async (userId: number, workspaceId: string) => {
  const workspace = await workspaceRepository.findAccessibleWorkspace(userId, workspaceId);

  if(!workspace)
    throw new AppError("Not authorised for this workspace", 403);

  return workspace;
}

export const getWorkspaceById = async ({ userId, workspaceId }: { userId: number; workspaceId: string }) => {
  await requireWorkspaceAccess(userId, workspaceId);

  const result = await workspaceRepository.findWorkspaceById(userId, workspaceId);

  if(!result)
    throw new AppError("Workspace not found", 404);

  return result;
}

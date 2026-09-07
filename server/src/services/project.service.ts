import type { ProjectVisibility } from "@prisma/client";
import { AppError } from "../errors/AppError";
import * as projectRepository from "../repository/project.repository";
import * as workspaceService from "./workspace.service";

export type CreateProjectInput = {
  userId: number;
  workspaceId: string;
  name: string;
  description?: string;
  visibility?: ProjectVisibility
};

export const getUserProjects = async (userId: number, workspaceId: string) => {
  const result = await projectRepository.getProjectsById(userId, workspaceId);
  return result;
}

export const createUserProject = async ({ userId, name, description, visibility, workspaceId }: CreateProjectInput) => {
  await workspaceService.requireWorkspaceAccess(userId, workspaceId);

  const result = await projectRepository.createProject({ userId, name, description, visibility, workspaceId });

  if(!result)
    throw new AppError("Project creation failed", 423);

  return result;
}

export const deleteUserProject = async (userId: number, workspaceId: string, projectId: string) => {
  await workspaceService.requireWorkspaceAccess(userId, workspaceId);

  await projectRepository.deleteProject(projectId);
  return {
    success: true
  };
}

export const getUserProjectById = async (userId: number, workspaceId: string, projectId: string) => {
  await workspaceService.requireWorkspaceAccess(userId, workspaceId);

  await requireProjectAccess(userId, workspaceId,  projectId);

  const result = await projectRepository.findProjectById(projectId);
  return result;
}

export const requireProjectAccess = async (userId: number, workspaceId: string, projectId: string) => {
  const result = await projectRepository.findAccessibleProject(userId, workspaceId, projectId);

  if(!result)
    throw new AppError("Unauthorised access", 403);

  return true;
}
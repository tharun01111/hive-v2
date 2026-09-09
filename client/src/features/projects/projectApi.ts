import api from "@/api/axios";

export interface Project {
  id: string;
  name: string;
  description: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | null;
}

export const getProjects = async (workspaceId: string): Promise<Project[]> => {
  console.log("Workspace id: ", workspaceId);
  const response = await api.get(`/api/workspaces/${workspaceId}/projects`);
  return response.data.projects;
};

export const getProjectById = async (
  workspaceId: string,
  projectId: string,
): Promise<Project> => {
  const response = await api.get(
    `/api/workspaces/${workspaceId}/projects/${projectId}`,
  );
  return response.data.project;
};

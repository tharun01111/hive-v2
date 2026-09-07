import api from "@/api/axios"

export interface Workspace {
  id: string,
  name: string,
  description: string | null,
  role: "OWNER" | "ADMIN" | "MEMBER" | null,
}

export const getWorkspaces = async (): Promise<Workspace[]> => {
  try {
    const response = await api.get("/api/workspaces");
    return response.data.workspaces;   
  } catch  {
    throw new Error("Could not fetch workspaces...");
  }
}

export const getWorkspacesById = async (workspaceId: string): Promise<Workspace> => {
  try {
    const response = await api.get(`/api/workspaces/${workspaceId}`);
    return response.data.workspace;
  } catch {
    throw new Error("Could not fetch workspace");
  }
}

export const normalizeApiError = (error: unknown) => {
  if(error instanceof Error) return error.message;

  return "Unknown error";
}
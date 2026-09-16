import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store";

export interface Project {
  id: string;
  name: string;
  description: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | null;
}

interface ProjectResponse {
  success: boolean;
  projects: Project[];
}

export const projectApiSlice = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Projects"],

  endpoints: (builder) => ({
    //get All projects
    getProjects: builder.query<Project[], string>({
      query: (workspaceId) => `/workspaces/${workspaceId}/projects`,
      transformResponse: (response: ProjectResponse) => response.projects,
      providesTags: ["Projects"],
    }),

    //get project by Id
    getProjectById: builder.query<
      Project,
      { workspaceId: string; projectId: string }
    >({
      query: ({ workspaceId, projectId }) =>
        `/workspaces/${workspaceId}/projects/${projectId}`,
      transformResponse: (response: { success: boolean; project: Project }) =>
        response.project,
      providesTags: (_result, _error, { projectId }) => [
        { type: "Projects", id: projectId },
      ],
    }),

    //create a project

    createProject: builder.mutation<
      Project,
      {
        workspaceId: string;
        name: string;
        description?: string;
      }
    >({
      query: ({ workspaceId, name, description }) => ({
        url: `workpaces/${workspaceId}/projects`,
        method: "POST",
        body: {
          name,
          description,
        },
      }),

      invalidatesTags: ["Projects"],
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectByIdQuery } = projectApiSlice;

import type { RootState } from "@/app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  role: "OWNER" | "ADMIN" | "MEMBER" | null;
}

interface WorkspaceResponse {
  success: boolean;
  workspaces: Workspace[];
}

export const workspaceApiSlice = createApi({
  reducerPath: "workspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: ["Workspaces"],

  endpoints: (builder) => ({
    //Get all workspaces
    getWorkspaces: builder.query<Workspace[], void>({
      query: () => "/workspaces",
      transformResponse: (response: WorkspaceResponse) => response.workspaces,
      providesTags: ["Workspaces"],
    }),

    //Get workspace by id
    getWorkspaceById: builder.query<Workspace, string>({
      query: (workspaceId) => `workspaces/${workspaceId}`,
      transformResponse: (response: {
        success: boolean;
        workspace: Workspace;
      }) => response.workspace,
      providesTags: (_result, _error, workspaceId) => [
        { type: "Workspaces", id: workspaceId },
      ],
    }),

    //create workspace
    createWorkspace: builder.mutation<
      Workspace,
      {
        name: string;
        description?: string;
      }
    >({
      query: ({ name, description }) => ({
        url: import.meta.env.VITE_APP_API_URL,
        method: "POST",
        body: {
          name,
          description,
        },
      }),

      invalidatesTags: ["Workspaces"],
    }),
  }),
});

export const { useGetWorkspacesQuery, useGetWorkspaceByIdQuery, useCreateWorkspaceMutation } =
  workspaceApiSlice;

import type { RootState } from "@/app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface StatsResponse {
  workspaceCount: number;
  projectCount: number;
  memberCount: number;
}

export const dashboardApiSlice = createApi({
  reducerPath: "dashboardStats",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: ["Stats"],

  endpoints: (builder) => ({
    getDashboardStats: builder.query<StatsResponse, void>({
      query: () => `dashboard/stats`,
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApiSlice;

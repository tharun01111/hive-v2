import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { projectApiSlice } from "@/features/projects/projectApi";
import { workspaceApiSlice } from "@/features/workspace/workspaceApi";
import { dashboardApiSlice } from "@/features/dashboard/dashboardApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [workspaceApiSlice.reducerPath]: workspaceApiSlice.reducer,
    [projectApiSlice.reducerPath]: projectApiSlice.reducer,
    [dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectApiSlice.middleware)
      .concat(workspaceApiSlice.middleware)
      .concat(dashboardApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

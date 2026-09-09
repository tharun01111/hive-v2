import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getProjects, type Project } from "./projectApi";
import { type RootState } from "@/app/store";
import { normalizeApiError } from "../workspace/workspaceApi";

type Status = "idle" | "failed" | "succeeded" | "pending";

interface ProjectsExtraState {
  status: Status;
  error: string | null;
}

const projectsAdapter = createEntityAdapter<Project>();

const initialState = projectsAdapter.getInitialState<ProjectsExtraState>({
  status: "idle",
  error: null,
});

export const fetchAllProjects = createAsyncThunk<
  Project[],
  string,
  { rejectValue: string }
>("projects/fetchAll", async (workspaceId, { rejectWithValue }) => {
  try {
    return await getProjects(workspaceId);
  } catch (error) {
    return rejectWithValue(normalizeApiError(error));
  }
});

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProjects.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        projectsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default projectSlice.reducer;
export const { selectAll: selectAllProjects, selectById: selectProjectsById } =
  projectsAdapter.getSelectors<RootState>((state) => state.projects);

import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getWorkspaces, getWorkspacesById, normalizeApiError, type Workspace } from "./workspaceApi";
import type { RootState } from "@/app/store"; 

type Status = "idle" | "failed" | "succeeded" | "pending";

interface WorkspaceExtraState {
  status: Status,
  error: string | null
}

const workspaceAdapter = createEntityAdapter<Workspace>();

const initialState = workspaceAdapter.getInitialState<WorkspaceExtraState>({
  status: "idle",
  error: null,
});

export const fetchWorkspaces = createAsyncThunk<
Workspace[],
void,
{ rejectValue: string }
> ("workspaces/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getWorkspaces();
  } catch (error) {
    return rejectWithValue(normalizeApiError(error));
  }
});

export const fetchWorkspacesById = createAsyncThunk<
Workspace,
string,
{ rejectValue: string }
> ("workspaces/fetchById", async (workspaceId, { rejectWithValue }) => {
  try {
    return await getWorkspacesById(workspaceId);
  } catch (error) {
    return rejectWithValue(normalizeApiError(error));
  }
});


const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchWorkspaces.pending, (state) => {
      state.status = "pending";
      state.error = null;
    })
    .addCase(fetchWorkspaces.fulfilled, (state, action) => {
      state.status = "succeeded";
      workspaceAdapter.setAll(state, action.payload);
    })
    .addCase(fetchWorkspaces.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload ?? "Something went wrong";
    })
    .addCase(fetchWorkspacesById.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(fetchWorkspacesById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      workspaceAdapter.setOne(state, action.payload);
    })
    .addCase(fetchWorkspacesById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload ?? "Something went wrong";
    });
  },
});

export default workspaceSlice.reducer;

export const { selectAll: selectAllWorkspaces, selectById: selectWorkspaceById } 
= workspaceAdapter.getSelectors<RootState>((state) => state.workspaces);
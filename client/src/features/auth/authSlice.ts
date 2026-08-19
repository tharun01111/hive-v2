import { loginUser, registerUser, verifyToken, type LoginUser, type RegisterUser } from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}

interface AuthState {
  user: User | null,
  isAuthenticated: boolean,
  loading: boolean,
  token: string | null,
  error: string | null
};

const token = localStorage.getItem("token");

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  token,
  error: null
};

export const loginEmp = createAsyncThunk(
  "auth/login", async (data: LoginUser) => {
    const response = await loginUser(data);
    return response;
  }
)

export const registerEmp = createAsyncThunk("auth/register", 
  async(data: RegisterUser) => {
    const response = await registerUser(data);
    return response;
});

export const initializeAuth = createAsyncThunk("auth/initializeAuth",
  async(_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if(!token) 
      return null;

    try{
      const response = await verifyToken(token);

      return {
        token,
        user: response.user
      };
    } catch  {
      localStorage.removeItem("token");
      return rejectWithValue("Session expired");
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

    //login
    .addCase(loginEmp.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginEmp.fulfilled, (state, action) => {
      console.log("Entered Slice...");
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      localStorage.setItem("token", action.payload.token);
      console.log("Exiting Slice...");
    })
    .addCase(loginEmp.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) ?? action.error.message ?? "Something went wrong...";
    })

    //register
    .addCase(registerEmp.pending, (state) => {
      state.loading = true;
    })
    .addCase(registerEmp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
      state.isAuthenticated = true;
    })
    .addCase(registerEmp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Something went wrong...";
    })

    //initializeAuth
    .addCase(initializeAuth.pending, (state) => {
      state.loading = true;
    })
    .addCase(initializeAuth.fulfilled, (state, action) => {
      state.loading = false;
      if(action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      }
    })
    .addCase(initializeAuth.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.error.message ?? "Something went wrong";
    })
  }
});

export const { clearError, logout } = authSlice.actions;

export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axiosConfig";
import Cookies from "js-cookie";

// Define the error response type
interface ErrorResponse {
  message: string;
}

interface User {
  _id: string;
  fullName: string;
  userEmail: string;
  rules: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  token: Cookies.get("token") || null,
  error: null,
  isLoading: false,
};

export const login = createAsyncThunk<
  { user: User; token: string },
  { userEmail: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/login", credentials);
    console.log(response.data);

    const { user, token } = response.data;
    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(user));
    Cookies.set("userId", user.id);
    Cookies.set("userEmail", user.email);
    Cookies.set("fullName", user.fullName);
    Cookies.set("rules", user.rules.name);
    localStorage.setItem("login", "true");

    return { user, token };
  } catch (error) {
    // Check if error is an AxiosError and use its response data
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        (error.response.data as ErrorResponse).message || "Login failed";
      return rejectWithValue(errorMessage);
    }
    return rejectWithValue("Login failed");
  }
});

export const fetchUserDetails = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchUserDetails", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/auth/user");
    return response.data;
  } catch (error) {
    // Check if error is an AxiosError and use its response data
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        (error.response.data as ErrorResponse).message ||
        "Failed to fetch user details";
      return rejectWithValue(errorMessage);
    }
    return rejectWithValue("Failed to fetch user details");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      Cookies.remove("token");
      localStorage.setItem("login", "false");
      Cookies.remove("user");
      Cookies.remove("userId");
      Cookies.remove("userEmail");
      Cookies.remove("fullName");
      Cookies.remove("rules");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch user details";
        state.isLoading = false;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;

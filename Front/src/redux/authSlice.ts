import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../utils/axiosConfig";

interface User {
  fullName: string;
  email: string;
  rules: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  error: string | null;
}

export const fetchUserDetails = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchUserDetails", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("No token found");
    }
    console.log("Token before request:", token);

    // Make the request with Axios
    const response = await axios.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    // Return the data directly
    return response.data;
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      // Axios error
      console.error("Error response:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user details"
      );
    } else {
      // Non-Axios error
      console.error("Error:", error);
      return rejectWithValue("Failed to fetch user details");
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isLoggedIn: false, error: null } as AuthState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUserDetails.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      }
    );
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.error = action.payload || "Failed to fetch user details";
      console.error("Failed to fetch user details:", state.error);
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      throw new Error("No token found");
    }
    console.log("Token before request:", token);

    const response = await fetch("http://localhost:4000/auth/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    const responseText = await response.text();
    console.log("Response text:", responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { message: responseText };
      }
      console.error("Fetch error:", errorData);
      throw new Error(errorData.message || "Failed to fetch user details");
    }

    const data = JSON.parse(responseText);
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in fetchUserDetails:", errorMessage);
    return rejectWithValue(errorMessage);
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

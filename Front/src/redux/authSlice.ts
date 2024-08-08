import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface User {
    fullName: string;
    email: string;
    rules: string;
}

interface AuthState {
    user: User | null;
    isLoggedsIn: boolean;
}
const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, isLoggedsIn: false } as AuthState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isLoggedsIn = true;
        },
        logout(state) {
            state.user = null;
            state.isLoggedsIn = false;
            
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
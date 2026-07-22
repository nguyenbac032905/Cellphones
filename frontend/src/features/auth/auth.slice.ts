import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse, AuthUser} from "./types/auth.types";

interface AuthState{
    accessToken: string | null,
    user: AuthUser |null,
};

const initialState : AuthState = {
    accessToken: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state,action: PayloadAction<AuthResponse>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        clearAuth: (state) => {
            state.accessToken = null;
            state.user = null;
        }
    }
})

export const {setAuth, clearAuth} = authSlice.actions;

export default authSlice.reducer;
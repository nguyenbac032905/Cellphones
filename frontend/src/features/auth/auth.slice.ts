import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User,LoginResponse } from "./types/auth.types";

interface AuthState{
    accessToken: string | null,
    user: User | null,
    message: string | null
};

const initialState : AuthState = {
    accessToken: null,
    user: null,
    message: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state,action: PayloadAction<LoginResponse>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        clearAuth: (state) => {
            state.accessToken = null;
            state.user = null;
            state.message = null;
        }
    }
})

export const {setAuth, clearAuth} = authSlice.actions;

export default authSlice.reducer;
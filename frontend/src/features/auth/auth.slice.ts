import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthResponse, AuthUser} from "./types/auth.types";
import type { AddCouponBody } from "../coupons/types/coupon.type";

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
        },
        addCouponReducer: (state, action: PayloadAction<AddCouponBody>) => {
            if (!state.user) return;
            state.user.coupons.push(action.payload.couponID);
        }
    }
})

export const {setAuth, clearAuth, addCouponReducer} = authSlice.actions;

export default authSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import cartReducer from "../features/cart/cart.slice";
import wishlistReducer from "../features/wishlist/wishlist.slice";
import branchReducer from "../features/branches/branch.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        branch: branchReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

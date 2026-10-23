import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductListClient } from "../products/types/products.type";

export type WishlistItem = ProductListClient & { _id: string };

interface WishlistState {
    items: WishlistItem[];
}

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        // Nạp wishlist từ localStorage vào state khi load lại trang
        setWishlistReducer: (state, action: PayloadAction<WishlistItem[]>) => {
            state.items = action.payload;
        },
        // Có rồi thì xóa, chưa có thì thêm
        toggleWishlistReducer: (state, action: PayloadAction<WishlistItem>) => {
            const index = state.items.findIndex((item) => item._id === action.payload._id);
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.unshift(action.payload);
            }
        },
        removeWishlistReducer: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        clearWishlistReducer: (state) => {
            state.items = [];
        },
    },
});

export const {
    setWishlistReducer,
    toggleWishlistReducer,
    removeWishlistReducer,
    clearWishlistReducer,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;

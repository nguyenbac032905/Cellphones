import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, CartItem, CartResponse } from "./types/cart.type";

interface CartState {
    cart: Cart | null;
}

const initialState: CartState = {
    cart: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartResponse>) => {
            state.cart = action.payload.data;
        },
        addItem: (state, action: PayloadAction<CartItem>) => {
            if (!state.cart) return;

            const existItem = state.cart.products.find(
                (item) => item.productID._id === action.payload.productID._id
            );

            if (existItem) {
                existItem.quantity += action.payload.quantity;
            } else {
                state.cart.products.push(action.payload);
            }
        },
        clearCart: (state) => {
            state.cart = null
        }
    },
});

export const { setCart, addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
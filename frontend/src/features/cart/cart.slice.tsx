import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, CartItem, CartResponse, CartItemBody, DeleteItemBody, DeleteBulkItem } from "./types/cart.type";


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
        setCartReducer: (state, action: PayloadAction<CartResponse>) => {
            state.cart = action.payload.data;
        },
        addItemReducer: (state, action: PayloadAction<CartItem>) => {
            if (!state.cart) return;

            // Cùng sản phẩm nhưng khác variant là 2 dòng riêng
            const existItem = state.cart.products.find(
                (item) => item.variant._id === action.payload.variant._id
            );

            if (existItem) {
                existItem.quantity += action.payload.quantity;
            } else {
                state.cart.products.push(action.payload);
            }
        },
        editItemReducer: (state, action: PayloadAction<CartItemBody>) => {
            if (!state.cart) return;

            const item = state.cart.products.find(
                (item) => item.variant._id === action.payload.variantID
            );

            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        deleteItemReducer: (state, action: PayloadAction<DeleteItemBody>) => {
            if (!state.cart) return;

            state.cart.products = state.cart.products.filter(
                (item) => item.variant._id !== action.payload.variantID
            );
        },
        deleteBulkReducer: (state, action: PayloadAction<DeleteBulkItem>) => {
            if (!state.cart) return;

            const variantIDSet = new Set(action.payload.variantIDs);
            state.cart.products = state.cart.products.filter(
                item => !variantIDSet.has(item.variant._id)
            );
        },
        clearCartReducer: (state) => {
            state.cart = null
        }
    },
});

export const { setCartReducer, addItemReducer, clearCartReducer, editItemReducer, deleteItemReducer, deleteBulkReducer } = cartSlice.actions;
export default cartSlice.reducer;

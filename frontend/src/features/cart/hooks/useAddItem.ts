import { useState } from "react";
import { cartService } from "../services/cart.service";
import type { CartItem } from "../types/cart.type";
import { addItemReducer } from "../cart.slice";
import { useDispatch } from "react-redux";

export const useAddItem = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const addItemToCart = async (cartItem: CartItem) => {
        try {
            setLoading(true);

            const result = await cartService.addItem({productID: cartItem.productID._id, quantity: cartItem.quantity});
            dispatch(addItemReducer(cartItem));

            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, addItemToCart };
};
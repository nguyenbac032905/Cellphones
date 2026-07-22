import { useState } from "react";
import type { CartItemBody } from "../validations/cart.validation";
import { cartService } from "../services/cart.service";

export const useAddItem = () => {
    const [loading, setLoading] = useState(false);

    const addItemToCart = async (body: CartItemBody) => {
        try {
            setLoading(true);

            const result = await cartService.addItem(body);

            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, addItemToCart };
};
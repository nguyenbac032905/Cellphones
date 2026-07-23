import { useState } from "react";
import { cartService } from "../services/cart.service";
import type { CartItemBody } from "../types/cart.type";
import { useDispatch } from "react-redux";
import { editItemReducer } from "../cart.slice";

export const useEditItem = () => {
    const [editing, setEditing] = useState("");
    const dispatch = useDispatch();

    const editItem = async (body: CartItemBody) => {
        try {
            setEditing(body.productID);
            
            const result = await cartService.editItem(body);
            dispatch(editItemReducer(body));

            return result;
        } finally {
            setEditing(body.productID);
        }
    };

    return { editing, editItem };
};
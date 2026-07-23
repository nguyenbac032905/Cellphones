import { useState } from "react";
import { cartService } from "../services/cart.service";
import type { DeleteItemBody } from "../types/cart.type";
import { useDispatch } from "react-redux";
import { deleteItemReducer  } from "../cart.slice";

export const useDeleteItem = () => {
    const [deleting, setDeleting] = useState("");
    const dispatch = useDispatch();

    const deleteItem = async (body: DeleteItemBody) => {
        try {
            setDeleting(body.productID);
            
            const result = await cartService.deleteItem(body);
            dispatch(deleteItemReducer(body));

            return result;
        } finally {
            setDeleting(body.productID);
        }
    };

    return { deleting, deleteItem };
};
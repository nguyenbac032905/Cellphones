import { useState } from "react";
import { cartService } from "../services/cart.service";
import type { DeleteBulkItem } from "../types/cart.type";
import { useDispatch } from "react-redux";
import { deleteBulkReducer } from "../cart.slice";

export const useDeleteBulkItem = () => {
    const [deleting, setDeleting] = useState<string[]>([]);
    const dispatch = useDispatch();

    const deleteBulk = async (body: DeleteBulkItem) => {
        try {
            setDeleting(body.variantIDs);

            const result = await cartService.deleteBulk(body)
            dispatch(deleteBulkReducer(body));

            return result;
        } finally {
            setDeleting(body.variantIDs);
        }
    };

    return { deleting, deleteBulk };
};

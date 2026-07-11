import { useState } from "react";
import { productCategoryAdminService } from "../services/productCategoryAdmin.service";

export const useDeleteCategoryAdmin = () => {
    const [deletingID, setDeletingID] = useState("");

    const deleteCategory = async (categoryID: string) => {
        try {
            setDeletingID(categoryID);
            
            const result = await productCategoryAdminService.delete(categoryID);

            return result;
        } finally {
            setDeletingID("");
        }
    };
    return { deletingID, deleteCategory };
};
import { useState } from "react";
import type { UpdateCategoryBody } from "../validations/category.validation";
import { productCategoryAdminService } from "../services/productCategoryAdmin.service";

export const useUpdateCategoryAdmin = () => {
    const [updating, setUpdating] = useState("");

    const updateCategory = async (categoryID: string, body: UpdateCategoryBody) => {
        try {
            setUpdating(categoryID);

            const res = await productCategoryAdminService.update(categoryID, body);

            return res;
        } finally {
            setUpdating(categoryID);
        }
    };

    return {updating,updateCategory};
};
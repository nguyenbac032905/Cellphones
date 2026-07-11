import { useState } from "react";
import type { UpdateCategoryBody } from "../validations/category.validation";
import { productCategoryAdminService } from "../services/productCategoryAdmin.service";

export const useUpdateCategoryAdmin = () => {
    const [loading, setLoading] = useState(false);

    const updateCategory = async (categoryID: string, body: UpdateCategoryBody) => {
        try {
            setLoading(true);

            const res = await productCategoryAdminService.update(categoryID, body);

            return res;
        } finally {
            setLoading(false);
        }
    };

    return {loading,updateCategory};
};
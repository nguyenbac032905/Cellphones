import { useState } from "react";
import type { CreateCategoryBody } from "../validations/category.validation";
import { productCategoryAdminService } from "../services/productCategoryAdmin.service";

export const useCreateCategoryAdmin = () => {
    const [loading, setLoading] = useState(false);

    const createCategory = async (body: CreateCategoryBody) => {
        try {
            setLoading(true);

            const result = await productCategoryAdminService.create(body);

            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, createCategory };
};
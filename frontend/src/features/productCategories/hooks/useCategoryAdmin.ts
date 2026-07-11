import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { CategoryDetail } from "../types/categories.type";
import { productCategoryAdminService } from "../services/productCategoryAdmin.service";

export const useCategoryAdmin = (categoryId?: string) => {
    const [category, setCategory] = useState<CategoryDetail>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if(!categoryId) return;
                
                setLoading(true);
                setError("");

                const result = await productCategoryAdminService.get(categoryId);
                
                setCategory(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [categoryId]);
    return {category, loading, error};
};
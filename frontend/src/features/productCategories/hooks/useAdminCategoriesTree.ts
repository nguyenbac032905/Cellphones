import { useEffect, useState } from "react";
import type { CategoryTreeResponse } from "../../products/types/categories.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { productCategoryAdminService } from "../services/productCategoryAdmin.service";

export const useAdminCategoriesTree = () => {
    const [data, setData] = useState<CategoryTreeResponse>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await productCategoryAdminService.getCategoryTree();

                setData(result);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { data, loading, error };
};
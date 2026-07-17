import { useEffect, useState } from "react";
import type { ProductCategory } from "../types/categories.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { productCategoryService } from "../services/productCategory.service";

export const useGetAllChildCategory = (categorySlug: string) => {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await productCategoryService.getAllChild(categorySlug);

               setCategories(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [categorySlug]);

    return { categories, loading, error };
};
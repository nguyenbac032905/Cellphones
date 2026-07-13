import { useEffect, useState } from "react";
import type { CategoryTree } from "../types/categories.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { productCategoryService } from "../services/productCategory.service";

export const useCategoriesTree = () => {
    const [categoriesTree, setCategoriesTree] = useState<CategoryTree[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await productCategoryService.getTree();

               if(result.success){
                    setCategoriesTree(result.data);
               }
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categoriesTree, loading, error };
};
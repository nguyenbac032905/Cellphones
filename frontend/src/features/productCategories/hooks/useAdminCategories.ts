import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { PaginationMeta } from "../../../shared/types/common.type";
import type { CategoryListItem, ProductCategoryQuery } from "../types/categories.type";
import { productCategoryAdminService } from "../services/productCategoryAdmin.service";

export const useAdminCategories = (query: ProductCategoryQuery) => {
    const [categories, setCategories] = useState<CategoryListItem[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 4,
        totalPages: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await productCategoryAdminService.getAll(query);

            if (res.success) {
                setCategories(res.data);
                setMeta(res.meta);
            }
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [
        query.status,
        query.category,
        query.search,
        query.sort,
        query.page,
        query.limit
    ]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        meta,
        loading,
        error,
        refetch: fetchCategories
    };
};
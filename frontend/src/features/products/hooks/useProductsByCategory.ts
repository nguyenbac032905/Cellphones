import { useCallback, useEffect, useMemo, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { productService } from "../services/product.service";
import type { ProductClientQuery, ProductListClient, } from "../types/products.type";
import type { PaginationMeta } from "../../../shared/types/common.type";

export const useProductsByCategory = ( categorySlug: string, query?: ProductClientQuery,defaultLimit = "20" ) => {
    const [products, setProducts] = useState<ProductListClient[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const finalQuery = useMemo(
        () => ({
            ...query,
            limit: defaultLimit,
        }),
        [query, defaultLimit]
    );
    
    const fetchApi = useCallback(async () => {
        if (!categorySlug) return;

        try {
            setLoading(true);
            setError("");

            const result = await productService.getProductByCategory(
                categorySlug,
                finalQuery
            );

            setProducts(result.data);
            setMeta(result.meta);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, [categorySlug, finalQuery]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    return {
        products,
        meta,
        loading,
        error,
        refetch: fetchApi,
    };
};
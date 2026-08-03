import { useCallback, useEffect, useMemo, useState } from "react";
import type {ProductClientQuery, ProductListClient} from "../types/products.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { PaginationMeta } from "../../../shared/types/common.type";
import { productService } from "../services/product.service";

export const useProducts = (query: ProductClientQuery,defaultLimit = "20") => {
    const [products, setProducts] = useState<ProductListClient[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const finalQuery = useMemo(
        () => ({
            ...query,
            limit: defaultLimit,
        }),
        [query, defaultLimit]
    );

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            
            const res = await productService.getAll(finalQuery);
            
            if (res.success) {
                setProducts(res.data);
                setMeta(res.meta);
            }
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [
        finalQuery.featured,
        finalQuery.discount,
        finalQuery.search,
        finalQuery.sort,
        finalQuery.page,
        finalQuery.limit,
        finalQuery.minPrice,
        finalQuery.maxPrice,
    ]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        meta,
        loading,
        error,
        refetch: fetchProducts
    };
};
import { useCallback, useEffect, useState } from "react";
import type {ProductClientQuery, ProductListClient} from "../types/products.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { PaginationMeta } from "../../../shared/types/common.type";
import { productService } from "../services/product.service";

export const useProducts = (query: ProductClientQuery) => {
    const [products, setProducts] = useState<ProductListClient[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            
            const res = await productService.getAll(query);
            
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
        query.featured,
        query.discount,
        query.search,
        query.sort,
        query.page,
        query.limit,
        query.minPrice,
        query.maxPrice,
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
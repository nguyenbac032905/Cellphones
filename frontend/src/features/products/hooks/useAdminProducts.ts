import { useCallback, useEffect, useState } from "react";
import { productAdminService } from "../services/productAdmin.service";
import type {PaginationMeta,Product,ProductQuery} from "../types/products.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

export const useAdminProducts = (query: ProductQuery) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 4,
        totalPages: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await productAdminService.getAll(query);

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
        query.status,
        query.category,
        query.search,
        query.sort,
        query.page,
        query.limit,
        query.stock
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
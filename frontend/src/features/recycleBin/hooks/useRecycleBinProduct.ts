import { useCallback, useEffect, useState } from "react";
import type { ProductDeletedResponse } from "../types/products.type";
import { recycleBinAdminService } from "../services/recycleBinAdmin.service";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

export const useRecycleBinProduct = () => {
    const [products, setProducts] = useState<ProductDeletedResponse["products"]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);

            const res = await recycleBinAdminService.getProducts();

            setProducts(res.products);
        } catch (error: any) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        refetch: fetchProducts,
    };
};
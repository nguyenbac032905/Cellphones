import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { productService } from "../services/product.service";
import type { ProductListClient } from "../types/products.type";

export const useProductsByCategory = (categorySlug: string) => {
    const [products, setProducts] = useState<ProductListClient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if(!categorySlug) return;
                
                setLoading(true);
                setError("");

                const result = await productService.getProductByCategory(categorySlug);
                
                setProducts(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [categorySlug]);
    return {products, loading, error};
};
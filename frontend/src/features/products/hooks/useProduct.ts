import { useEffect, useState } from "react";

import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { ProductDetailClient } from "../types/products.type";
import { productService } from "../services/product.service";

export const useProduct = (productSlug: string) => {
    const [product, setProduct] = useState<ProductDetailClient>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if(!productSlug) return;
                
                setLoading(true);
                setError("");

                const result = await productService.getProduct(productSlug);
                
                setProduct(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [productSlug]);
    return {product, loading, error};
};
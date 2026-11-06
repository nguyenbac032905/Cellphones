import { useEffect, useState } from "react";

import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { ProductVariantClient } from "../types/products.type";
import { productService } from "../services/product.service";
import { useAppSelector } from "../../../app/hooks";

export const useProductVariants = (productSlug: string) => {
    const [variants, setVariants] = useState<ProductVariantClient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const branchId = useAppSelector((state) => state.branch.branchId);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (!productSlug) return;

                setLoading(true);
                setError("");

                const result = await productService.getVariants(productSlug);

                setVariants(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [productSlug, branchId]);

    return { variants, loading, error };
};

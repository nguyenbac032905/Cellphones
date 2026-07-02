import { useEffect, useState } from "react";
import type { Product } from "../types/products.type";
import { productAdminService } from "../services/productAdmin.service";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

export const useAdminProduct = (productID?: string) => {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if(!productID) return;
                
                setLoading(true);
                setError("");

                const result = await productAdminService.get(productID);
                
                setProduct(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [productID]);
    return {product, loading, error};
};
import { useState } from "react";
import type { PatchProductBody, Product } from "../types/products.type";
import { productAdminService } from "../services/productAdmin.service";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

export const useAdminUpdateProduct = () => {
    const [data, setData] = useState<Product>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const updateProduct = async (product: PatchProductBody, productID: string) => {
        try {
            setLoading(true);
            setError("");

            const data = await productAdminService.update(product, productID);
            setData(data);

            return data;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, updateProduct };
};
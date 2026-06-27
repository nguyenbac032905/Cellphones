import { useState } from "react";
import type { Product } from "../types/products.type";
import { productAdminService } from "../services/productAdmin.service";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

export const useAdminDeleteProduct = () => {
    const [data, setData] = useState<Product>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const deleteProduct = async (productID: string) => {
        try {
            setLoading(true);
            setError("");

            const data = await productAdminService.delete(productID);
            setData(data);

            return data;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, deleteProduct };
};
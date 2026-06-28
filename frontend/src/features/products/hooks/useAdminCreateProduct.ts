import { useState } from "react";
import type { PostProductBody, Product } from "../types/products.type";
import { productAdminService } from "../services/productAdmin.service";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

export const useAdminCreateProduct = () => {
    const [data, setData] = useState<Product>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const createProduct = async (product: PostProductBody) => {
        try {
            setLoading(true);
            setError("");

            const data = await productAdminService.create(product);
            setData(data);

            return data;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, createProduct };
};
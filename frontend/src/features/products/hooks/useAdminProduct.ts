import { useEffect, useState } from "react";
import type { Product } from "../types/products.type";
import { productAdminService } from "../services/productAdmin.service";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

export const useAdminProduct = (productID?: string) => {
    const [data, setData] = useState<Product>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if(!productID) return;
                
                setLoading(true);
                setError("");

                const data = await productAdminService.get(productID);
                console.log(data)
                setData(data);
            } catch (error) {
                const message = getErrorMessage(error);
                setError(message);
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [productID]);
    return {data, loading, error};
};
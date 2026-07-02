import { useState } from "react";
import { productAdminService } from "../services/productAdmin.service";

export const useAdminDeleteProduct = () => {
    const [loading, setLoading] = useState(false);

    const deleteProduct = async (productID: string) => {
        try {
            setLoading(true);
            
            const result = await productAdminService.delete(productID);

            return result;
        } finally {
            setLoading(false);
        }
    };
    return { loading, deleteProduct };
};
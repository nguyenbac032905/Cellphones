import { useState } from "react";
import type { PatchProductBody} from "../types/products.type";
import { productAdminService } from "../services/productAdmin.service";

export const useAdminUpdateProduct = () => {
    const [loading, setLoading] = useState(false);

    const updateProduct = async ( product: PatchProductBody, productID: string) => {
        try {
            setLoading(true);
            console.log(product)
            const res = await productAdminService.update(product, productID);

            return res;
        } finally {
            setLoading(false);
        }
    };

    return {loading,updateProduct};
};
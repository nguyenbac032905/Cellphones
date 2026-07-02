import { useState } from "react";
import type { PostProductBody} from "../types/products.type";
import { productAdminService } from "../services/productAdmin.service";

export const useAdminCreateProduct = () => {
    const [loading, setLoading] = useState(false);

    const createProduct = async (product: PostProductBody) => {
        try {
            setLoading(true);

            const result = await productAdminService.create(product);

            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, createProduct };
};
import { publicClient } from "../../../shared/api/publicClient";
import type { ProductByCategoryResponse } from "../types/products.type";

export const productService = {
    getProductByCategory: async (categorySlug: string): Promise<ProductByCategoryResponse> => {
        const res = await publicClient.get<ProductByCategoryResponse>(`/api/products/${categorySlug}/categories`);
        return res.data;
    }
};
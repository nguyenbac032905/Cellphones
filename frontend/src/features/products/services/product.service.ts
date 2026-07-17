import { publicClient } from "../../../shared/api/publicClient";
import type { ProductClientQuery, ProductListClientResponse } from "../types/products.type";

export const productService = {
    getProductByCategory: async (categorySlug: string, query: ProductClientQuery): Promise<ProductListClientResponse> => {
        const res = await publicClient.get<ProductListClientResponse>(`/api/products/${categorySlug}/categories`, {params: query});
        return res.data;
    },
    getAll: async (query: ProductClientQuery): Promise<ProductListClientResponse> => {
        const res = await publicClient.get<ProductListClientResponse>(`/api/products`, {params: query});
        return res.data;
    }
};
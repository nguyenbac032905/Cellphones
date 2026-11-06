import { publicClient } from "../../../shared/api/publicClient";
import type { ProductClientQuery, ProductDetailClientResponse, ProductListClientResponse, ProductVariantsClientResponse } from "../types/products.type";

export const productService = {
    getProductByCategory: async (categorySlug: string, query: ProductClientQuery): Promise<ProductListClientResponse> => {
        const res = await publicClient.get<ProductListClientResponse>(`/api/products/${categorySlug}/categories`, {params: query});
        return res.data;
    },
    getAll: async (query: ProductClientQuery): Promise<ProductListClientResponse> => {
        const res = await publicClient.get<ProductListClientResponse>(`/api/products`, {params: query});
        return res.data;
    },
    getProduct: async (productSlug: string): Promise<ProductDetailClientResponse> => {
        const res = await publicClient.get<ProductDetailClientResponse>(`/api/products/${productSlug}`);
        return res.data;
    },
    getVariants: async (productSlug: string): Promise<ProductVariantsClientResponse> => {
        const res = await publicClient.get<ProductVariantsClientResponse>(`/api/products/${productSlug}/variants`);
        return res.data;
    }
};
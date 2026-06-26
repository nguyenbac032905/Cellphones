import { publicClient } from "../../../shared/api/publicClient";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { PatchProductBody, Product, ProductListResponse, ProductQuery } from "../types/products.type";

export const productAdminService = {
    getAll: async (query: ProductQuery): Promise<ProductListResponse> => {
        try {
            const res = await publicClient.get<ProductListResponse>("/admin/api/products",{ params: query });
            return {
                pagination: res.data.pagination,
                products: res.data.products
            };
        } catch (error) {
            const message = getErrorMessage(error);
            throw new Error(message);
        }
    },
    update: async (product: PatchProductBody, productID: string): Promise<Product> => {
        try {
            const res = await publicClient.patch<Product>(`/admin/api/products/${productID}`, product);
            return res.data
        } catch (error) {
            const message = getErrorMessage(error);
            throw new Error(message);
        }
    }
};
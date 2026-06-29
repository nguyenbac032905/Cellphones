import { publicClient } from "../../../shared/api/publicClient";
import type { ProductDeletedResponse, BaseProductResponse } from "../types/products.type";

export const recycleBinAdminService = {
    getProducts: async (): Promise<ProductDeletedResponse> => {
        const res = await publicClient.get<ProductDeletedResponse>("/admin/api/recycle-bin/products");
        return res.data
    },
    restoreProduct: async (productID: string): Promise<BaseProductResponse> => {
        const res = await publicClient.patch<BaseProductResponse>(`/admin/api/recycle-bin/products/${productID}/restore`);
        return res.data
    },
    forceProduct: async (productID: string): Promise<BaseProductResponse> => {
        const res = await publicClient.delete<BaseProductResponse>(`/admin/api/recycle-bin/products/${productID}/force`);
        return res.data
    }
}
import { privateClient } from "../../../shared/api/privateClient";
import type { ProductDeletedResponse, BaseProductResponse } from "../types/products.type";

export const recycleBinAdminService = {
    getProducts: async (): Promise<ProductDeletedResponse> => {
        const res = await privateClient.get<ProductDeletedResponse>("/admin/api/recycle-bin/products");
        return res.data
    },
    restoreProduct: async (productID: string): Promise<BaseProductResponse> => {
        const res = await privateClient.patch<BaseProductResponse>(`/admin/api/recycle-bin/products/${productID}/restore`);
        return res.data
    },
    forceProduct: async (productID: string): Promise<BaseProductResponse> => {
        const res = await privateClient.delete<BaseProductResponse>(`/admin/api/recycle-bin/products/${productID}/force`);
        return res.data
    }
}
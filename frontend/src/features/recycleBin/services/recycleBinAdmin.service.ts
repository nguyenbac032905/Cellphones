import { privateAdmin } from "../../../shared/api/privateAdmin";
import type { ProductDeletedResponse, BaseProductResponse } from "../types/products.type";

export const recycleBinAdminService = {
    getProducts: async (): Promise<ProductDeletedResponse> => {
        const res = await privateAdmin.get<ProductDeletedResponse>("/admin/api/recycle-bin/products");
        return res.data
    },
    restoreProduct: async (productID: string): Promise<BaseProductResponse> => {
        const res = await privateAdmin.patch<BaseProductResponse>(`/admin/api/recycle-bin/products/${productID}/restore`);
        return res.data
    },
    forceProduct: async (productID: string): Promise<BaseProductResponse> => {
        const res = await privateAdmin.delete<BaseProductResponse>(`/admin/api/recycle-bin/products/${productID}/force`);
        return res.data
    }
}
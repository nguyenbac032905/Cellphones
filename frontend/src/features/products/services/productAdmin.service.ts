import { privateAdmin } from "../../../shared/api/privateAdmin";
import type { MessageResponse } from "../../../shared/types/common.type";
import type { PatchProductBody, PostProductBody, ProductListResponse, ProductQuery, ProductResponse } from "../types/products.type";

export const productAdminService = {
    getAll: async (query: ProductQuery): Promise<ProductListResponse> => {
        const res = await privateAdmin.get<ProductListResponse>("/admin/api/products",{ params: query });
        return res.data;
    },
    get: async (productID: string): Promise<ProductResponse> => {
        const res = await privateAdmin.get<ProductResponse>(`/admin/api/products/${productID}`);
        return res.data;
    },
    update: async (product: PatchProductBody,productID: string): Promise<MessageResponse> => {
        const res = await privateAdmin.patch<MessageResponse>(`/admin/api/products/${productID}`,product);
        return res.data;
    },
    delete: async (productID: string): Promise<MessageResponse> => {
        const res = await privateAdmin.delete<MessageResponse>(`/admin/api/products/${productID}`);
        return res.data;
    },
    create: async (product: PostProductBody): Promise<MessageResponse> => {
        const res = await privateAdmin.post<MessageResponse>(`/admin/api/products`, product);
        return res.data;
    }
};
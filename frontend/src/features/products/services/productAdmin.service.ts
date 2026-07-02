import { privateClient } from "../../../shared/api/privateClient";
import type {
    MessageResponse,
    PatchProductBody,
    PostProductBody,
    ProductListResponse,
    ProductQuery,
    ProductResponse
} from "../types/products.type";

export const productAdminService = {
    getAll: async (query: ProductQuery): Promise<ProductListResponse> => {
        const res = await privateClient.get<ProductListResponse>("/admin/api/products",{ params: query });
        return res.data;
    },
    get: async (productID: string): Promise<ProductResponse> => {
        const res = await privateClient.get<ProductResponse>(`/admin/api/products/${productID}`);
        return res.data;
    },
    update: async (product: PatchProductBody,productID: string): Promise<MessageResponse> => {
        const res = await privateClient.patch<MessageResponse>(`/admin/api/products/${productID}`,product);
        return res.data;
    },
    delete: async (productID: string): Promise<MessageResponse> => {
        const res = await privateClient.delete<MessageResponse>(`/admin/api/products/${productID}`);
        return res.data;
    },
    create: async (product: PostProductBody): Promise<MessageResponse> => {
        const res = await privateClient.post<MessageResponse>(`/admin/api/products`, product);
        return res.data;
    }
};
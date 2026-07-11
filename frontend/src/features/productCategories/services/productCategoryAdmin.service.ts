import { privateClient } from "../../../shared/api/privateClient";
import type { MessageResponse } from "../../../shared/types/common.type";
import type { CategoryDetailResponse, CategoryListResponse, CategoryTreeResponse, ProductCategoryQuery } from "../types/categories.type";
import type { CreateCategoryBody, UpdateCategoryBody } from "../validations/category.validation";

export const productCategoryAdminService = {
    getCategoryTree: async (): Promise<CategoryTreeResponse> => {
        const res = await privateClient.get<CategoryTreeResponse>("/admin/api/product-categories/tree");
        return res.data;
    },
    getAll: async (query: ProductCategoryQuery): Promise<CategoryListResponse> => {
        const res = await privateClient.get<CategoryListResponse>("/admin/api/product-categories", {params: query});
        return res.data;
    },
    create: async (body: CreateCategoryBody): Promise<MessageResponse> => {
        const res = await privateClient.post<MessageResponse>("/admin/api/product-categories", body);
        return res.data;
    },
    update: async (categoryID: string, body: UpdateCategoryBody): Promise<MessageResponse> => {
        const res = await privateClient.patch<MessageResponse>(`/admin/api/product-categories/${categoryID}`, body);
        return res.data;
    },
    get: async (categoryID: string): Promise<CategoryDetailResponse> => {
        const res = await privateClient.get<CategoryDetailResponse>(`/admin/api/product-categories/${categoryID}`);
        return res.data;
    },
    delete: async (categoryID: string): Promise<MessageResponse> => {
        const res = await privateClient.delete<MessageResponse>(`/admin/api/product-categories/${categoryID}`);
        return res.data;
    }
};
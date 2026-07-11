import { privateClient } from "../../../shared/api/privateClient";
import type { CategoryListResponse, CategoryTreeResponse, ProductCategoryQuery } from "../types/categories.type";

export const productCategoryAdminService = {
    getCategoryTree: async (): Promise<CategoryTreeResponse> => {
        const res = await privateClient.get<CategoryTreeResponse>("/admin/api/product-categories/tree");
        return res.data;
    },
    getAll: async (query: ProductCategoryQuery): Promise<CategoryListResponse> => {
        const res = await privateClient.get<CategoryListResponse>("/admin/api/product-categories", {params: query});
        return res.data;
    }
};
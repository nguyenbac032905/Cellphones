import { privateClient } from "../../../shared/api/privateClient";
import type { CategoryTreeResponse } from "../types/categories.type";

export const productCategoryAdminService = {
    getCategoryTree: async (): Promise<CategoryTreeResponse> => {
        const res = await privateClient.get<CategoryTreeResponse>("/admin/api/product-categories/tree");
        return res.data;
    }
};
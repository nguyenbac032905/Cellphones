import { publicClient } from "../../../shared/api/publicClient";
import type { AllChildCategory, CategoryTreeResponse } from "../types/categories.type";

export const productCategoryService = {
    getTree: async (): Promise<CategoryTreeResponse> => {
        const result = await publicClient.get<CategoryTreeResponse>("/api/product-categories/tree");
        return result.data;
    },
    getAllChild: async (categorySlug: string): Promise<AllChildCategory> => {
        const result = await publicClient.get<AllChildCategory>(`/api/product-categories/${categorySlug}`);
        return result.data;
    }
}
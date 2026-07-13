import { publicClient } from "../../../shared/api/publicClient";
import type { CategoryTreeResponse } from "../types/categories.type";

export const productCategoryService = {
    getTree: async (): Promise<CategoryTreeResponse> => {
        const result = await publicClient.get<CategoryTreeResponse>("/api/product-categories/tree");
        return result.data;
    }
}
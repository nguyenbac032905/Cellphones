import { privateClient } from "../../../shared/api/privateClient";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { CategoryTreeResponse } from "../../products/types/categories.type";

export const productCategoryAdminService = {
    getCategoryTree: async (): Promise<CategoryTreeResponse> => {
        try {
            const res = await privateClient.get<CategoryTreeResponse>("/admin/api/product-categories/tree");
            return res.data;
        } catch (error) {
            const message = getErrorMessage(error);
            throw new Error(message);
        }
    }
}
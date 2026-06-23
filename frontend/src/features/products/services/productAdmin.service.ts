import { publicClient } from "../../../shared/api/publicClient";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { Product } from "../types/products.type";

export const productAdminService = {
    getAll: async (): Promise<Product[]> => {
        try {
            const res = await publicClient.get<Product[]>("/admin/api/products");
            // Axios trả data trực tiếp trong res.data
            return res.data;
        } catch (error) {
            const message = getErrorMessage(error);
            throw new Error(message);
        }
    },
};
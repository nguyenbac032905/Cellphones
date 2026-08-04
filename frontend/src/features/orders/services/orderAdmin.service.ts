import { privateAdmin } from "../../../shared/api/privateAdmin";
import type { GetOrdersResponse, OrderQuery } from "../types/orderAdmin.type";

export const orderAdminService = {
    getAll: async (query: OrderQuery): Promise<GetOrdersResponse> => {
        const result = await privateAdmin.get<GetOrdersResponse>("/admin/api/orders",{params: query});
        return result.data
    }
}
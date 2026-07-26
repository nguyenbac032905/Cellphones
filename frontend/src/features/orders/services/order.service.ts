import { privateClient } from "../../../shared/api/privateClient";
import type { CreateOrderResponse } from "../types/order.type";
import type { CreateOrderBody } from "../validations/order.validation";

export const orderService = {
    create: async (body: CreateOrderBody): Promise<CreateOrderResponse> => {
        const result = await privateClient.post<CreateOrderResponse>("/api/orders", body);
        return result.data;
    }
}
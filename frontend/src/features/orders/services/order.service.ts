import { privateClient } from "../../../shared/api/privateClient";
import type { CreateOrderResponse, GetOrderResponse, MyOrdersResponse } from "../types/order.type";
import type { CreateOrderBody } from "../validations/order.validation";

export const orderService = {
    create: async (body: CreateOrderBody): Promise<CreateOrderResponse> => {
        const result = await privateClient.post<CreateOrderResponse>("/api/orders", body);
        return result.data;
    },
    get: async (orderID: string): Promise<GetOrderResponse> => {
        const result = await privateClient.get<GetOrderResponse>(`/api/orders/${orderID}`);
        return result.data;
    },
    getAll: async (): Promise<MyOrdersResponse> => {
        const result = await privateClient.get<MyOrdersResponse>(`/api/orders`);
        return result.data;
    }
}
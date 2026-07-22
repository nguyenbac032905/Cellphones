import { privateClient } from "../../../shared/api/privateClient";
import type { MessageResponse } from "../../../shared/types/common.type";
import type { CartItemBody, CartResponse } from "../types/cart.type";

export const cartService = {
    getCart: async (): Promise<CartResponse> => {
        const result = await privateClient.get<CartResponse>("/api/cart");
        return result.data;
    },
    addItem: async (body: CartItemBody): Promise<MessageResponse> => {
        const result = await privateClient.post<MessageResponse>("/api/cart/items", body);
        return result.data;
    }
}
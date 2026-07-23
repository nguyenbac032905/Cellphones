import { privateClient } from "../../../shared/api/privateClient";
import type { MessageResponse } from "../../../shared/types/common.type";
import type { CartItemBody, CartResponse, DeleteBulkItem, DeleteItemBody } from "../types/cart.type";

export const cartService = {
    getCart: async (): Promise<CartResponse> => {
        const result = await privateClient.get<CartResponse>("/api/cart");
        return result.data;
    },
    addItem: async (body: CartItemBody): Promise<MessageResponse> => {
        const result = await privateClient.post<MessageResponse>("/api/cart/items", body);
        return result.data;
    },
    editItem: async (body: CartItemBody): Promise<MessageResponse> => {
        const result = await privateClient.patch<MessageResponse>("/api/cart/items", body);
        return result.data;
    },
    deleteItem: async (body: DeleteItemBody): Promise<MessageResponse> => {
        const result = await privateClient.delete<MessageResponse>( "/api/cart/items", { data: body } );
        return result.data;
    },
    deleteBulk: async (body: DeleteBulkItem): Promise<MessageResponse> => {
        const result = await privateClient.delete<MessageResponse>("/api/cart/items/bulk", {data: body});
        return result.data
    }
}
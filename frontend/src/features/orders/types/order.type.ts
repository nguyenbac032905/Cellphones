import type { ApiResponse } from "../../../shared/types/common.type";

export interface CreateOrder {
    orderID: string;
    paymentMethod: "COD" | "VNPAY";
    nextAction: {
        type: "redirect" | "navigate";
        url: string;
    };
};
export type CreateOrderResponse = ApiResponse<CreateOrder>;
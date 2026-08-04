import type { ApiResponse, PaginationMeta } from "../../../shared/types/common.type";

export interface OrderQuery {
    page?: string;
    limit?: string;
    orderStatus?: string;
    fromDate?: string;
    toDate?: string;
    sort?: string;
}
//get order
export interface OrderItem {
    productID: string;
    title: string;
    price: number;
    discountPercentage: number;
    quantity: number;
    mainImage: string;
}

export interface ShippingAddress {
    fullName: string;
    phone: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    note?: string;
    districtID: number;
    wardCode: string;
}

export interface PaymentDetail {
    paymentMethod: "COD" | "VNPAY";
    paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
    vnpayTransactionNo?: string;
    paidAt?: string;
}

export interface ShippingDetails {
    shippingOrderCode?: string;
    expectedDeliveryDate?: string;
    ghnStatus?:
        | "ready_to_pick"
        | "picking"
        | "cancel"
        | "picked"
        | "storing"
        | "transporting"
        | "sorting"
        | "delivering"
        | "delivery_fail"
        | "delivered"
        | "waiting_to_return"
        | "return"
        | "returned";
}

export interface Pricing {
    subTotal: number;
    discountAmount: number;
    shippingFee: number;
    totalPrice: number;
}

export interface Order {
    _id: string;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentDetail: PaymentDetail;
    orderStatus: | "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERING" | "DELIVERED" | "CANCELLED" | "RETURNED";
    shippingDetails: ShippingDetails;
    pricing: Pricing;
    deleted: boolean;
    createdAt: string;
}

export type GetOrdersResponse = ApiResponse<Order[]> & {
    meta: PaginationMeta
}
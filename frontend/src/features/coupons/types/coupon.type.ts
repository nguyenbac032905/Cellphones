import type { ApiResponse } from "../../../shared/types/common.type";

export interface Coupon {
    _id: string;
    title: string;
    description: string;
    discountType: "percent" | "fixed";
    discountValue: number;
    maxDiscount: number | null;
    minOrderValue: number;
    expireAt: string;
    status: "active" | "inactive";
    deleted: boolean;
}
export type AddCouponBody = {
    couponID: string
}

export type CouponsResponse = ApiResponse<Coupon[]>;
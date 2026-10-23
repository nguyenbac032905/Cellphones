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

export type BestCouponBody = {
    products: { productID: string; quantity: number }[];
};

export interface CouponDiscount {
    couponID: string;
    title: string;
    minOrderValue: number;
    eligible: boolean;
    discountAmount: number;
}

export interface BestCouponData {
    orderTotal: number;
    bestCouponID: string | null;
    bestDiscountAmount: number;
    coupons: CouponDiscount[];
}

export type BestCouponResponse = ApiResponse<BestCouponData>;
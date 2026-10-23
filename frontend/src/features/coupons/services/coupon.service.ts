import { publicClient } from "../../../shared/api/publicClient"
import type { AddCouponBody, BestCouponBody, BestCouponResponse, CouponsResponse } from "../types/coupon.type";
import type { MessageResponse } from "../../../shared/types/common.type";
import { privateClient } from "../../../shared/api/privateClient";

export const couponService = {
    getAll: async (): Promise<CouponsResponse> => {
        const result = await publicClient.get<CouponsResponse>("/api/coupons");
        return result.data
    },
    getBest: async (body: BestCouponBody): Promise<BestCouponResponse> => {
        const result = await privateClient.post<BestCouponResponse>("/api/coupons/best", body);
        return result.data
    },
    addCoupon: async (body: AddCouponBody): Promise<MessageResponse> => {
        const result = await privateClient.post<MessageResponse>("/api/coupons",body);
        return result.data
    }
}
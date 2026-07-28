import { publicClient } from "../../../shared/api/publicClient"
import type { CouponsResponse } from "../types/coupon.type";

export const couponService = {
    getAll: async (): Promise<CouponsResponse> => {
        const result = await publicClient.get<CouponsResponse>("/api/coupons");
        return result.data
    }
}
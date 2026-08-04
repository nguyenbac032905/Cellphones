import { privateAdmin } from "../../../shared/api/privateAdmin";
import type { CouponsResponse } from "../types/coupon.type";

export const couponAdminService = {
    getAll: async (): Promise<CouponsResponse> => {
        const result = await privateAdmin.get<CouponsResponse>("/admin/api/coupons");
        return result.data
    }
}
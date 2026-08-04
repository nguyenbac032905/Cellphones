import { getCouponsService } from "../../services/admin/coupon.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Response, Request } from "express";

export const getCoupons = asyncHandler(async (req: Request, res: Response) => {
    const result = await getCouponsService();
    return res.status(200).json({
        success: true,
        data: result.data
    });
});
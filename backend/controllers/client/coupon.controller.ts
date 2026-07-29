import { addCouponService, getCouponsService } from "../../services/client/coupon.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Response, Request } from "express";

export const getCoupons = asyncHandler(async (req: Request, res: Response) => {
    const result = await getCouponsService();
    return res.status(200).json({
        success: true,
        data: result.data
    });
});
export const addCoupon = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await addCouponService(user?._id.toString(), req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    })
})
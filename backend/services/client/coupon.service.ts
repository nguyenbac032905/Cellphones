import Coupon from "../../models/coupon.model"

export const getCouponsService = async () => {
    const coupons = await Coupon.find({deleted: false, status: "active"}).lean();
    return {
        data: coupons
    }
}
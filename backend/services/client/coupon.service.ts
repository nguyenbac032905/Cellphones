import Coupon from "../../models/coupon.model"
import User from "../../models/user.model";
import { AddCouponBody } from "../../validations/client/coupon.validation";

export const getCouponsService = async () => {
    const coupons = await Coupon.find({deleted: false, status: "active"}).lean();
    return {
        data: coupons
    }
};
export const addCouponService = async ( userID: string, body: AddCouponBody ) => {
    await User.updateOne( { _id: userID }, { $addToSet: { coupons: body.couponID, }, } );

    return {
        message: "Add coupon successfully",
    };
};
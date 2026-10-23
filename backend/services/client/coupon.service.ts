import Coupon from "../../models/coupon.model"
import User from "../../models/user.model";
import Product from "../../models/product.model";
import { calculateCouponDiscount, ICoupon } from "../../helpers/pricing";
import { AddCouponBody, BestCouponBody } from "../../validations/client/coupon.validation";

export const getCouponsService = async () => {
    const coupons = await Coupon.find({deleted: false, status: "active"}).lean();
    return {
        data: coupons
    }
};
export const getBestCouponService = async ( userID: string, body: BestCouponBody ) => {
    // Tính giá trị đơn hàng (sau giảm giá trực tiếp) từ giá trong DB, không tin giá từ client
    const productIDs = body.products.map((item) => item.productID);
    const dbProducts = await Product.find({ _id: { $in: productIDs }, deleted: false, status: "active" })
        .select("price discountPercentage")
        .lean();
    const productMap = new Map(dbProducts.map((p) => [p._id.toString(), p]));

    let subTotal = 0;
    let discountDirect = 0;
    for (const item of body.products) {
        const product = productMap.get(item.productID);
        if (!product) continue;
        subTotal += product.price * item.quantity;
        discountDirect += product.price * item.quantity * (product.discountPercentage / 100);
    }
    const orderTotal = Math.round(subTotal) - Math.round(discountDirect);

    // Chỉ xét các voucher user đã lưu, còn hiệu lực
    const user = await User.findById(userID).select("coupons").lean();
    const savedIDs = user?.coupons ?? [];
    const coupons = savedIDs.length
        ? await Coupon.find({ _id: { $in: savedIDs }, deleted: false, status: "active", expireAt: { $gt: new Date() } }).lean<ICoupon[]>()
        : [];

    const results = coupons
        .map((coupon) => ({
            couponID: coupon._id.toString(),
            title: coupon.title,
            minOrderValue: coupon.minOrderValue,
            eligible: orderTotal >= coupon.minOrderValue,
            discountAmount: calculateCouponDiscount(orderTotal, coupon),
        }))
        .sort((a, b) => b.discountAmount - a.discountAmount);

    const best = results.find((r) => r.eligible && r.discountAmount > 0) ?? null;

    return {
        data: {
            orderTotal,
            bestCouponID: best?.couponID ?? null,
            bestDiscountAmount: best?.discountAmount ?? 0,
            coupons: results,
        }
    };
};

export const addCouponService = async ( userID: string, body: AddCouponBody ) => {
    await User.updateOne( { _id: userID }, { $addToSet: { coupons: body.couponID, }, } );

    return {
        message: "Add coupon successfully",
    };
};
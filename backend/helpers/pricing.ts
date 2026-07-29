import { Types } from "mongoose";
interface PricingItem {
    price: number;
    quantity: number;
    discountPercentage: number;
}

export interface ICoupon {
    _id: Types.ObjectId;
    title: string;
    description: string;
    discountType: "percent" | "fixed";
    discountValue: number;
    maxDiscount: number | null;
    minOrderValue: number;
    expireAt: Date;
    status: "active" | "inactive";
    deleted: boolean;
}

interface CalculatePricingParams {
    items: PricingItem[];
    shippingFee: number;
    freeShippingThreshold?: number;
    coupon?: ICoupon | null
}

interface PricingResult {
    subTotal: number;
    discountAmount: number;
    orderTotal: number;
    shippingFee: number;
    actualShippingFee: number;
    totalPrice: number;
    isFreeShip: boolean;
    paymentTypeID: 1 | 2;
    discountCoupon: number;
}

export const calculatePricing = ({ items, shippingFee,coupon, freeShippingThreshold = 300000 }: CalculatePricingParams): PricingResult => {
    const subTotal = Math.round( items.reduce( (sum, item) => sum + item.price * item.quantity, 0 ) );

    const discountDirect = Math.round( items.reduce( (sum, item) => sum + item.price * item.quantity * (item.discountPercentage / 100), 0 ) );
    const orderTotal = subTotal - discountDirect;
    
    const discountCoupon = Math.round(coupon ? 
        (orderTotal >= coupon.minOrderValue
            ? coupon.discountType === "percent"
                ? Math.min(
                    orderTotal * coupon.discountValue / 100,
                    coupon.maxDiscount ?? Number.MAX_SAFE_INTEGER
                )
                : Math.min(orderTotal, coupon.discountValue)
            : 0)
        : 0);
    
    const discountAmount = discountCoupon + discountDirect;

    const isFreeShip = orderTotal >= freeShippingThreshold;
    const actualShippingFee = isFreeShip ? 0 : shippingFee;

    const totalPrice = orderTotal - discountCoupon + actualShippingFee;

    return { subTotal, discountAmount,discountCoupon, orderTotal, shippingFee, actualShippingFee, totalPrice, isFreeShip, paymentTypeID: isFreeShip ? 1 : 2 };
};
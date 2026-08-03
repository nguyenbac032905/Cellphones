import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import type { Fee } from "../types/checkout.type";
import type { Coupon } from "../../coupons/types/coupon.type";

export const useCheckoutSummary = ({ fee, selectedCoupon, }: { fee?: Fee | null; selectedCoupon: Coupon | null; }) => {
    const cart = useAppSelector((state) => state.cart.cart);

    const ids = useMemo(
        () => JSON.parse(sessionStorage.getItem("selectedProductIDs") ?? "[]"),
        []
    );

    const products = useMemo(() => {
        return cart?.products.filter((item) =>
            ids.includes(item.productID._id)
        ) ?? [];
    }, [cart, ids]);

    const subTotal = useMemo(() => {
        return Math.round(
            products.reduce(
                (sum, item) =>
                    sum + item.productID.price * item.quantity,
                0
            )
        );
    }, [products]);

    const directDiscount = useMemo(() => {
        return Math.round(
            products.reduce(
                (sum, item) =>
                    sum +
                    item.productID.price *
                        (item.productID.discountPercentage / 100) *
                        item.quantity,
                0
            )
        );
    }, [products]);
    
    const totalOrder = subTotal - directDiscount;

    const discountCoupon = selectedCoupon
        ? Math.round(
            totalOrder >= selectedCoupon.minOrderValue
                ? selectedCoupon.discountType === "percent"
                    ? Math.min(
                            (totalOrder * selectedCoupon.discountValue) / 100,
                            selectedCoupon.maxDiscount ?? Infinity
                        )
                    : Math.min(totalOrder, selectedCoupon.discountValue)
                : 0
        )
        : 0;
    const discountAmount = directDiscount + discountCoupon;

    const isFreeShip = totalOrder >= 300000;

    const shippingFee = isFreeShip ? 0 : fee?.total ?? 0;

    const totalPrice = totalOrder + shippingFee - discountCoupon;

    const totalSaving = discountAmount + (isFreeShip ? fee?.total ?? 0 : 0);

    return {
        products,
        subTotal,
        directDiscount,
        discountAmount,
        totalOrder,
        isFreeShip,
        shippingFee,
        totalPrice,
        totalSaving,
        discountCoupon
    };
};
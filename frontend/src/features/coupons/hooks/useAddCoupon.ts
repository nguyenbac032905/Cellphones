import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AddCouponBody } from "../types/coupon.type";
import { couponService } from "../services/coupon.service";
import { addCouponReducer } from "../../auth/auth.slice";

export const useAddCoupon = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const addCoupon = async (body: AddCouponBody) => {
        try {
            setLoading(true);

            const result = await couponService.addCoupon(body);
            dispatch(addCouponReducer(body));

            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, addCoupon };
};
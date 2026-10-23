import { useEffect, useMemo, useState } from "react";
import { couponService } from "../services/coupon.service";
import type { BestCouponData } from "../types/coupon.type";

type CheckoutItem = { productID: string; quantity: number };

// Gọi API tính giảm giá của các voucher user đã lưu cho giỏ hàng đang checkout
export const useBestCoupon = (items: CheckoutItem[], enabled: boolean = true) => {
    const [data, setData] = useState<BestCouponData | null>(null);
    const [loading, setLoading] = useState(false);

    // key ổn định để tránh gọi lại API khi mảng items đổi reference nhưng nội dung không đổi
    const key = useMemo(
        () => JSON.stringify(items.map((i) => [i.productID, i.quantity])),
        [items]
    );

    useEffect(() => {
        if (!enabled || items.length === 0) {
            setData(null);
            return;
        }
        let cancelled = false;
        const fetchApi = async () => {
            try {
                setLoading(true);
                const result = await couponService.getBest({ products: items });
                if (!cancelled) setData(result.data);
            } catch {
                if (!cancelled) setData(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchApi();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, enabled]);

    return { data, loading };
};

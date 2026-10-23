import { useEffect, useState } from "react";
import { reviewService } from "../services/review.service";
import type { MyReview } from "../types/review.type";
import { subscribeReviewChange } from "../utils/ratingStore";

// Review của user đang đăng nhập cho sản phẩm (để hiện form sửa). enabled=false khi chưa đăng nhập.
export const useMyReview = (productID: string, enabled: boolean) => {
    const [review, setReview] = useState<MyReview | null>(null);
    const [version, setVersion] = useState(0);

    useEffect(() => subscribeReviewChange(productID, () => setVersion(v => v + 1)), [productID]);

    useEffect(() => {
        if (!enabled) return;
        let cancelled = false;
        const fetchApi = async () => {
            try {
                const result = await reviewService.getMyReview(productID);
                if (!cancelled) setReview(result.data);
            } catch {
                if (!cancelled) setReview(null);
            }
        };
        fetchApi();
        return () => {
            cancelled = true;
        };
    }, [productID, enabled, version]);

    return { review: enabled ? review : null };
};

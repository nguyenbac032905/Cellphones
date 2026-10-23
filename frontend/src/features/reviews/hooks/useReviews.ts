import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { PaginationMeta } from "../../../shared/types/common.type";
import { reviewService } from "../services/review.service";
import type { ReviewItem, StarFilter } from "../types/review.type";
import { subscribeReviewChange } from "../utils/ratingStore";

const LIMIT = 5;

// Component dùng hook này nên được remount (key) khi đổi productID / star
export const useReviews = (productID: string, star?: StarFilter) => {
    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>();
    const [request, setRequest] = useState({ page: 1, nonce: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // review đổi (tạo/sửa/xóa) -> tải lại từ trang 1
    useEffect(
        () => subscribeReviewChange(productID, () => setRequest(r => ({ page: 1, nonce: r.nonce + 1 }))),
        [productID]
    );

    useEffect(() => {
        let cancelled = false;
        const fetchApi = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await reviewService.getReviews(productID, { star, page: request.page, limit: LIMIT });
                if (cancelled) return;

                setReviews(prev => (request.page === 1 ? result.data : [...prev, ...result.data]));
                setMeta(result.meta);
            } catch (err) {
                if (!cancelled) setError(getErrorMessage(err));
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchApi();
        return () => {
            cancelled = true;
        };
    }, [productID, star, request]);

    const loadMore = () => setRequest(r => ({ ...r, page: r.page + 1 }));

    return {
        reviews,
        meta,
        loading,
        error,
        hasMore: !!meta && meta.page < meta.totalPages,
        loadMore
    };
};

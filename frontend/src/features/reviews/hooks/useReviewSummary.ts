import { useEffect, useState } from "react";
import { reviewService } from "../services/review.service";
import type { ReviewSummary } from "../types/review.type";
import { subscribeReviewChange } from "../utils/ratingStore";

const emptySummary: ReviewSummary = {
    average: 0,
    total: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
};

export const useReviewSummary = (productID: string) => {
    const [summary, setSummary] = useState<ReviewSummary>(emptySummary);
    const [version, setVersion] = useState(0);

    useEffect(() => subscribeReviewChange(productID, () => setVersion(v => v + 1)), [productID]);

    useEffect(() => {
        let cancelled = false;
        const fetchApi = async () => {
            try {
                const result = await reviewService.getSummary(productID);
                if (!cancelled) setSummary(result.data);
            } catch {
                if (!cancelled) setSummary(emptySummary);
            }
        };
        fetchApi();
        return () => {
            cancelled = true;
        };
    }, [productID, version]);

    return { summary };
};

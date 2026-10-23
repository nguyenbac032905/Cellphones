import { useCallback, useEffect, useSyncExternalStore } from "react";
import { getCachedRating, requestRating, subscribeRating } from "../utils/ratingStore";

// Dùng trong ProductItem: lấy điểm trung bình của 1 sản phẩm.
// Nhiều ProductItem gọi hook cùng lúc sẽ được gom thành 1 request.
export const useProductRating = (productID?: string) => {
    const subscribe = useCallback(
        (cb: () => void) => (productID ? subscribeRating(productID, cb) : () => { }),
        [productID]
    );
    const getSnapshot = useCallback(
        () => (productID ? getCachedRating(productID) : undefined),
        [productID]
    );

    const rating = useSyncExternalStore(subscribe, getSnapshot);

    useEffect(() => {
        if (productID) requestRating(productID);
    }, [productID]);

    return {
        average: rating?.average ?? 0,
        total: rating?.total ?? 0,
        loaded: !!rating
    };
};

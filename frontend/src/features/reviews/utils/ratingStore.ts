import { reviewService } from "../services/review.service";
import type { RatingInfo } from "../types/review.type";

// Store nhỏ dùng chung cho toàn app:
// - gom nhiều ProductItem render cùng lúc thành 1 request (backend giới hạn 50 id / lần)
// - cache điểm trung bình theo productID
// - thông báo khi review của 1 sản phẩm thay đổi để các hook tự tải lại

const MAX_BATCH = 50;
const BATCH_DELAY_MS = 30;

const cache = new Map<string, RatingInfo>();
const requested = new Set<string>();
const pending = new Set<string>();
const ratingListeners = new Map<string, Set<() => void>>();
const changeListeners = new Map<string, Set<() => void>>();
let timer: ReturnType<typeof setTimeout> | null = null;

const addListener = (map: Map<string, Set<() => void>>, key: string, cb: () => void) => {
    let set = map.get(key);
    if (!set) {
        set = new Set();
        map.set(key, set);
    }
    set.add(cb);
    return () => {
        set.delete(cb);
        if (set.size === 0) map.delete(key);
    };
};

const notify = (map: Map<string, Set<() => void>>, key: string) => {
    map.get(key)?.forEach(cb => cb());
};

const flush = async () => {
    timer = null;
    const ids = Array.from(pending);
    pending.clear();

    for (let i = 0; i < ids.length; i += MAX_BATCH) {
        const chunk = ids.slice(i, i + MAX_BATCH);
        try {
            const res = await reviewService.getRatings(chunk);
            chunk.forEach(id => {
                cache.set(id, res.data[id] ?? { average: 0, total: 0 });
                notify(ratingListeners, id);
            });
        } catch {
            // cho phép lần mount sau thử lại
            chunk.forEach(id => requested.delete(id));
        }
    }
};

export const getCachedRating = (productID: string) => cache.get(productID);

export const requestRating = (productID: string, force = false) => {
    if (!force && (cache.has(productID) || requested.has(productID))) return;
    requested.add(productID);
    pending.add(productID);
    if (!timer) timer = setTimeout(flush, BATCH_DELAY_MS);
};

export const subscribeRating = (productID: string, cb: () => void) =>
    addListener(ratingListeners, productID, cb);

export const subscribeReviewChange = (productID: string, cb: () => void) =>
    addListener(changeListeners, productID, cb);

// gọi sau khi tạo / sửa / xóa review
export const emitReviewChange = (productID: string) => {
    // giữ giá trị cũ trong cache để UI không nháy, flush sẽ ghi đè giá trị mới
    requested.delete(productID);
    if (ratingListeners.has(productID)) {
        requestRating(productID, true);
    } else {
        // không ai đang hiển thị -> bỏ cache, lần mount sau sẽ tải lại
        cache.delete(productID);
    }
    notify(changeListeners, productID);
};

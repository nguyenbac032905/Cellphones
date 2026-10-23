import type { WishlistItem } from "../wishlist.slice";

export const WISHLIST_STORAGE_KEY = "wishlist";

export const loadWishlist = (): WishlistItem[] => {
    try {
        const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.filter((item) => item && item._id) : [];
    } catch {
        return [];
    }
};

export const saveWishlist = (items: WishlistItem[]) => {
    try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch {
        // localStorage đầy hoặc bị chặn: bỏ qua, state vẫn hoạt động
    }
};

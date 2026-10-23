import { setWishlistReducer } from "../../features/wishlist/wishlist.slice";
import { loadWishlist, saveWishlist } from "../../features/wishlist/utils/wishlistStorage";
import { store } from "../store";

export const bootstrapWishlist = () => {
    // 1. Nạp wishlist từ localStorage vào state
    store.dispatch(setWishlistReducer(loadWishlist()));

    // 2. Mỗi lần wishlist trong state đổi thì ghi lại vào localStorage
    let prevItems = store.getState().wishlist.items;
    store.subscribe(() => {
        const items = store.getState().wishlist.items;
        if (items !== prevItems) {
            prevItems = items;
            saveWishlist(items);
        }
    });
};

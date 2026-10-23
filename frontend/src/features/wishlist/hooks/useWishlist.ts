import { useCallback, useMemo } from "react";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { ProductListClient } from "../../products/types/products.type";
import {
    clearWishlistReducer,
    removeWishlistReducer,
    toggleWishlistReducer,
} from "../wishlist.slice";

export const useWishlist = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.wishlist.items);

    const idSet = useMemo(() => new Set(items.map((item) => item._id)), [items]);

    const isInWishlist = useCallback((id?: string) => !!id && idSet.has(id), [idSet]);

    const toggleWishlist = useCallback(
        (product: ProductListClient) => {
            if (!product._id) return;
            const existed = idSet.has(product._id);
            dispatch(toggleWishlistReducer({ ...product, _id: product._id }));
            message.success(
                existed
                    ? "Đã xóa sản phẩm khỏi danh sách yêu thích"
                    : "Đã thêm sản phẩm vào danh sách yêu thích"
            );
        },
        [dispatch, idSet]
    );

    const removeFromWishlist = useCallback(
        (id: string) => {
            dispatch(removeWishlistReducer(id));
            message.success("Đã xóa sản phẩm khỏi danh sách yêu thích");
        },
        [dispatch]
    );

    const clearWishlist = useCallback(() => {
        dispatch(clearWishlistReducer());
        message.success("Đã xóa toàn bộ sản phẩm yêu thích");
    }, [dispatch]);

    return { items, isInWishlist, toggleWishlist, removeFromWishlist, clearWishlist };
};

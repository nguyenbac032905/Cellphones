import React from "react";
import { Link } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { ProductItem } from "../../products/components/ProductItem";
import { useWishlist } from "../hooks/useWishlist";

const MyWishlistPage: React.FC = () => {
    const { items, clearWishlist } = useWishlist();

    return (
        <div className="flex flex-col gap-5 max-w-5xl mx-auto p-4">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <HeartOutlined className="text-xl text-blue-500" />
                    <span className="text-sm font-bold text-neutral-800">
                        Sản phẩm yêu thích ({items.length})
                    </span>
                </div>
                {items.length > 0 && (
                    <Popconfirm
                        title="Xóa toàn bộ sản phẩm yêu thích?"
                        okText="Xóa"
                        cancelText="Hủy"
                        onConfirm={clearWishlist}
                    >
                        <button
                            type="button"
                            className="cursor-pointer text-xs font-medium text-neutral-500 transition-colors hover:text-primary-500"
                        >
                            Xóa tất cả
                        </button>
                    </Popconfirm>
                )}
            </div>

            {items.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {items.map((item) => (
                        <ProductItem key={item._id} product={item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-300 py-12 text-center text-sm text-neutral-500">
                    <span>Bạn chưa có sản phẩm yêu thích nào.</span>
                    <Link to="/" className="font-medium text-primary-500 hover:underline">
                        Tiếp tục mua sắm
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyWishlistPage;

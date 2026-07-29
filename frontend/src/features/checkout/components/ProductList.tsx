import type { CartItem } from "../../cart/types/cart.type";
import { ShoppingOutlined } from "@ant-design/icons";


const ProductList = ({products}: {products: CartItem[]}) => {
    return (
        <div className="flex flex-col gap-4 bg-white rounded-xl p-4 sm:p-5 border border-neutral-200/80 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2 font-semibold text-base sm:text-lg">
                    <ShoppingOutlined className="text-primary-500 text-lg" />
                    <span>Danh sách sản phẩm thanh toán <span className="max-sm:hidden">({products.length} sản phẩm)</span></span>
                </div>
            </div>

            {products.length > 0 ? (
                <div className="divide-y divide-neutral-100">
                    {products.map((item) => (
                        <div className="py-3 flex items-center justify-between gap-3 sm:gap-4" key={item._id}>
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-neutral-100 p-1 flex items-center justify-center shrink-0 bg-neutral-50/50">
                                    <img
                                        className="w-full h-full object-contain"
                                        src={item.productID.mainImage}
                                        alt={item.productID.title}
                                    />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-1 min-w-0">
                                <p
                                    className="text-xs sm:text-sm font-semibold !text-neutral-800 line-clamp-2"
                                >
                                    {item.productID.title}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-sm sm:text-base font-bold text-primary-500">
                                        {Math.round(
                                            item.productID.price * (1 - item.productID.discountPercentage / 100)
                                        ).toLocaleString("vi-VN")}
                                        đ
                                    </span>
                                    <span className="text-xs text-neutral-400 line-through">
                                        {item.productID.price.toLocaleString("vi-VN")}đ
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 border border-neutral-200 rounded-lg bg-neutral-50 shrink-0 px-3 py-1 text-xs sm:text-sm font-medium text-neutral-700">
                                Số lượng: <b>{item.quantity}</b>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-6 text-neutral-500 text-sm">
                    Vui lòng chọn sản phẩm trong giỏ hàng để thanh toán
                </div>
            )}
        </div>
    )
}
export default ProductList;
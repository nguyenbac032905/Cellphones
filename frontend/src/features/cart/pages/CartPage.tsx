import { Link, useNavigate } from "react-router-dom";
import GiftIcon, { ArrowLeftSlide } from "../../../shared/components/Icons";
import { PlusOutlined, MinusOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import TicketPromo from "../../products/components/TicketPromo";
import { useAppSelector } from "../../../app/hooks";
import { useEditItem } from "../hooks/useEditItem";
import { message } from "antd";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { CartItemBody, DeleteItemBody } from "../types/cart.type";
import { useDeleteItem } from "../hooks/useDeleteItem";
import { useEffect, useMemo, useState } from "react";
import { useDeleteBulkItem } from "../hooks/useDeleteBulkItem";

const CartPage = () => {
    const cart= useAppSelector(state => state.cart.cart);
    const {editItem} = useEditItem();
    const {deleteItem} = useDeleteItem();
    const {deleteBulk} = useDeleteBulkItem();
    const navigate = useNavigate();
    //xu li checkbox
    const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
    const allProductIDs = useMemo( () => cart?.products.map(item => item.productID._id) ?? [], [cart] );
    useEffect(() => {
        setSelectedIDs(prev =>
            prev.filter(id => allProductIDs.includes(id))
        );
    }, [allProductIDs]);
    const handleSelectOne = (id: string) => {
        setSelectedIDs((prev) =>
            prev.includes(id) 
                ? prev.filter((selectedID) => selectedID !== id) 
                : [...prev, id]
        );
    };
    const handleSelectAll = (e: any) => {
        if(e.target.checked){
            setSelectedIDs(allProductIDs);
        }else{
            setSelectedIDs([]);
        }
    }
    
    //cac ham xu li cart
    const handleChangeQuantity = async ({productID, quantity}: CartItemBody) => {
        try {
            const result = await editItem({productID, quantity});
            message.success(result.message);
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    }
    const handleDeleteItem = async ({productID}: DeleteItemBody) => {
        try {
            const result = await deleteItem({productID});
            message.success(result.message);
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    }
    const handleDeleteSelected = async () => {
        try {
            const result = await deleteBulk({productIDs: selectedIDs});
            message.success(result.message);
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    }
    const handleCheckout = () => {
        if(selectedIDs.length === 0){
            message.error("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán");
            return;
        }
        sessionStorage.setItem("selectedProductIDs", JSON.stringify(selectedIDs));
        navigate("/checkout");
    }
    return (
        <div className="flex flex-col gap-3 mt-4 xl:px-1 px-2 min-h-[70vh] mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3 sm:px-4 bg-white shadow-sm">
                <Link to={"/"} className="text-xs whitespace-nowrap flex items-center justify-center gap-1 !text-blue-500 rounded-2xl px-1.5 py-1 hover:bg-neutral-50 hover:!underline">
                    <ArrowLeftSlide className="size-3.5" />
                    <span className="text-sm">Tiếp tục mua sắm</span>
                </Link>
                <div className="bg-[#dbe8fe] text-sm min-h-28px rounded-sm px-4 py-1.5">
                    <strong className="text-[#2570eb]">Miễn phí vận chuyển </strong>với đơn hàng từ 300.000đ
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-8 flex flex-col gap-4 bg-white rounded-xl p-4 sm:p-5 border border-neutral-100 shadow-sm">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                        <label className="flex items-center gap-2.5 cursor-pointer text-sm sm:text-base font-medium">
                            <input checked={allProductIDs.length > 0 && allProductIDs.length === selectedIDs.length} onChange={handleSelectAll} type="checkbox" className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                            <span>Tất cả ({allProductIDs.length} sản phẩm)</span>
                        </label>
                        <button onClick={handleDeleteSelected} className="text-primary-500 hover:text-primary-600 hover:bg-red-50 text-xs sm:text-sm font-medium transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1">
                            <DeleteOutlined />
                            <span>Xóa đã chọn</span>
                        </button>
                    </div>
                    {cart && cart.products?.length>0 && (
                        <div className="divide-y divide-neutral-100">
                            {cart?.products.map(item => (
                                <div className="py-4 flex flex-col gap-3" key={item._id}>
                                    <div className="flex items-center justify-between gap-3 sm:gap-4 relative py-3">
                                        <div className="flex items-center gap-3 shrink-0">
                                            <input checked={selectedIDs.includes(item.productID._id)} onChange={() => handleSelectOne(item.productID._id)} type="checkbox" className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-neutral-100 p-1 flex items-center justify-center shrink-0">
                                                <img
                                                    className="w-full h-full object-contain"
                                                    src={item.productID.mainImage}
                                                    alt={item.productID.title}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                                            <Link
                                                to={`/detail/${item.productID.slug}`}
                                                className="text-xs sm:text-sm font-medium !text-neutral-800 hover:!text-primary-500 hover:!underline transition-colors"
                                            >
                                               {item.productID.title}
                                            </Link>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm sm:text-base font-bold text-primary-500">{Math.round((item.productID.price*(1-item.productID.discountPercentage/100))).toLocaleString("vi-VN")}đ</span>
                                                <span className="text-xs text-neutral-400 line-through">{item.productID.price.toLocaleString("vi-VN")}đ</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 shrink-0">
                                            {item.quantity > 1 ? (
                                                <button onClick={() => handleChangeQuantity({productID: item.productID._id, quantity: item.quantity-1})} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 rounded-l-lg transition-colors">
                                                    <MinusOutlined className="text-[10px] sm:text-xs" />
                                                </button>
                                            ) : (
                                                <button onClick={() => handleDeleteItem({productID: item.productID._id})} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary-500 hover:bg-neutral-200 rounded-l-lg transition-colors">
                                                    <DeleteOutlined />
                                                </button>
                                            )}
                                            <span className="w-7 sm:w-9 text-center text-xs sm:text-sm font-medium text-neutral-800">
                                                {item.quantity}
                                            </span>
                                            <button onClick={() => handleChangeQuantity({productID: item.productID._id!, quantity: item.quantity+1})} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 rounded-r-lg transition-colors">
                                                <PlusOutlined className="text-[10px] sm:text-xs" />
                                            </button>
                                        </div>

                                        {/* Nút xóa Icon X */}
                                        <button onClick={() => handleDeleteItem({productID: item.productID._id})} className="absolute top-[-10px] right-[0px] text-neutral-400 hover:!text-primary-500 transition-colors p-1 shrink-0 self-center">
                                            <CloseOutlined className="text-base sm:text-lg" />
                                        </button>
                                    </div>

                                    {/* Promo Box ở phía dưới */}
                                    <div className="bg-neutral-50 rounded-xl p-3 flex flex-col gap-2 border border-neutral-100 ml-7 sm:ml-28">
                                        <div className="flex gap-2 items-center text-neutral-700">
                                            <GiftIcon className="size-4" />
                                            <span className="text-xs font-semibold">Khuyến mãi đi kèm</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <TicketPromo />
                                            <TicketPromo />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar (Right Side - 4 cols) */}
                <div className="lg:col-span-4 lg:sticky lg:top-25 flex flex-col gap-4 bg-white rounded-xl p-4 sm:p-5 border border-neutral-100 shadow-sm">
                    <h2 className="font-bold text-base sm:text-lg text-neutral-800 border-b border-neutral-100 pb-3">
                        Thông tin đơn hàng
                    </h2>

                    <div className="flex flex-col gap-3 text-sm">
                        <div className="flex items-center justify-between text-neutral-600">
                            <span>Số lượng sản phẩm</span>
                            <span className="font-semibold text-neutral-800">2</span>
                        </div>

                        <div className="flex items-center justify-between text-neutral-600">
                            <span>Tạm tính</span>
                            <span className="font-semibold text-neutral-800">816.000đ</span>
                        </div>

                        <div className="border-t border-neutral-100 pt-3 mt-1 flex justify-between items-start">
                            <div>
                                <div className="font-bold text-base text-neutral-900">Tổng tiền</div>
                                <div className="text-[11px] text-neutral-400 mt-0.5">
                                    (Đã bao gồm thuế VAT)
                                </div>
                            </div>
                            <span className="text-xl font-bold text-primary-500">816.000đ</span>
                        </div>
                    </div>

                    <button onClick={handleCheckout} className="w-full mt-2 flex flex-col items-center justify-center rounded-md text-white p-2 active:scale-[0.99] transition-all bg-primary-500 hover:bg-primary-600">
                        <strong className="text-base tracking-wide">MUA NGAY</strong>
                        <span className="text-[11px] font-normal opacity-90">
                            Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
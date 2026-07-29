import { Link } from "react-router-dom";
import type { Coupon } from "../types/coupon.type";
import { useAddCoupon } from "../hooks/useAddCoupon";
import { message } from "antd";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
interface TicketPromoProps {
    coupon: Coupon;
    variant: "collect" | "checkout";
    isAdded?: boolean;
    isSelected?: boolean;
    onSelect?: (coupon: Coupon) => void;
}
const TicketPromo = ({coupon, variant, isAdded = false, isSelected = false, onSelect}: TicketPromoProps) => {
    const {addCoupon} = useAddCoupon();
    const maskStyle = {
        maskImage: `
            radial-gradient(circle at 1px 2px, transparent 4px, black 5px),
            radial-gradient(circle at 1px 16px, transparent 4px, black 5px),
            radial-gradient(circle at 1px 31px, transparent 4px, black 5px),
            radial-gradient(circle at 1px 45px, transparent 4px, black 5px),
            radial-gradient(circle at 1px 60px, transparent 4px, black 5px),
            radial-gradient(circle at 1px 74px, transparent 4px, black 5px)
        `,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in"
    };

    const handleAddCoupon = async () => {
        try {
            const result = await addCoupon({couponID: coupon._id});
            message.success(result.message);
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    }

    return (
        <div className="flex w-[220px] h-[75px]">
            <div
                className="flex justify-center items-center bg-primary-500 text-white w-[54px] shrink-0 pl-1"
                style={maskStyle}
            >
                <span className="text-xs text-center">
                    Giảm<br />{coupon.discountType === "percent" ? `${coupon.discountValue}%` : `${coupon.discountValue / 1000}K`}
                </span>
            </div>
            <div className="flex-1 flex justify-between p-1.5 pl-2 bg-[#fff3f4] border-t border-r border-b border-primary-500 rounded-tr-lg rounded-br-lg">
                <div className="flex flex-col justify-between text-left flex-1 min-w-0">
                    <div className="flex flex-col">
                        <span className="font-extrabold text-[11px] text-gray-900 leading-tight">{coupon.title}</span>
                        <p className="text-[9px] text-gray-700 mt-0.5">
                            {coupon.description}
                        </p>
                    </div>
                    <div className="text-[8px] text-gray-500 leading-none flex flex-col gap-0.5">
                        <span className="font-semibold text-gray-800">Hết hạn: {new Date(coupon.expireAt).toLocaleString("vi-VN")}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 shrink-0 w-[58px]">
                    {variant === "collect" ? (
                        isAdded ? (
                            <button
                                disabled
                                className="w-full rounded-md bg-gray-300 py-1 px-1.5 text-center text-[9px] font-bold text-gray-600 shadow-sm cursor-not-allowed"
                            >
                                Đã thêm
                            </button>
                        ) : (
                            <button
                                onClick={handleAddCoupon}
                                className="w-full rounded-md bg-primary-500 py-1 px-1.5 text-center text-[9px] font-bold text-white shadow-sm transition-all hover:bg-primary-600 active:scale-95"
                            >
                                Thu thập
                            </button>
                        )
                    ) : (
                        isSelected ? (
                            <button
                                disabled
                                className="w-full rounded-md bg-gray-300 py-1 px-1.5 text-center text-[9px] font-bold text-gray-600 shadow-sm cursor-not-allowed"
                            >
                                Đã Dùng
                            </button>
                        ) : (
                            <button
                                onClick={() => onSelect?.(coupon)}
                                className="w-full rounded-md bg-red-500 py-1 px-1.5 text-center text-[9px] font-bold text-white shadow-sm transition-all hover:bg-red-600 active:scale-95"
                            >
                                Sử dụng
                            </button>
                        )
                    )}

                    <Link
                        to="/"
                        className="!text-primary-600 text-[9px] font-semibold !underline"
                    >
                        Xem thể lệ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TicketPromo;
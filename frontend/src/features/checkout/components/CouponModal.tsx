import { useEffect, useMemo } from "react";
import { Modal, Spin } from "antd";
import { TagOutlined, CloseOutlined } from "@ant-design/icons";
import type { BestCouponData, Coupon, CouponDiscount } from "../../coupons/types/coupon.type";
import TicketPromo from "../../coupons/components/TicketPromo";

type CouponModalProps = {
    isOpenModal: boolean;
    onCloseModal: () => void;
    coupons: Coupon[];
    selectedCoupon: Coupon | null;
    setSelectedCoupon: (coupon: Coupon) => void;
    bestCouponData: BestCouponData | null;
    bestCouponLoading?: boolean;
};

type CouponView = {
    coupon: Coupon;
    info?: CouponDiscount;
    isBest: boolean;
    eligible: boolean;
    discountAmount: number;
};

const formatMoney = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

const CouponModal = ({
    isOpenModal,
    onCloseModal,
    coupons,
    setSelectedCoupon,
    selectedCoupon,
    bestCouponData,
    bestCouponLoading = false,
}: CouponModalProps) => {
    const bestCouponID = bestCouponData?.bestCouponID ?? null;

    // Gắn thông tin giảm giá từ API vào từng coupon.
    // Thứ tự: tốt nhất -> đủ điều kiện (giảm nhiều trước) -> chưa đủ điều kiện
    const items: CouponView[] = useMemo(() => {
        const infoMap = new Map(
            (bestCouponData?.coupons ?? []).map((c) => [c.couponID, c])
        );
        return coupons
            .map((coupon) => {
                const info = infoMap.get(coupon._id);
                return {
                    coupon,
                    info,
                    isBest: coupon._id === bestCouponID,
                    eligible: !!info?.eligible && info.discountAmount > 0,
                    discountAmount: info?.discountAmount ?? 0,
                };
            })
            .sort((a, b) => {
                if (a.isBest !== b.isBest) return a.isBest ? -1 : 1;
                if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
                return b.discountAmount - a.discountAmount;
            });
    }, [coupons, bestCouponData, bestCouponID]);

    // Khi mở modal: tự động dùng voucher giảm nhiều nhất (nếu chưa chọn voucher nào)
    useEffect(() => {
        if (!isOpenModal || !bestCouponID || selectedCoupon) return;
        const best = coupons.find((c) => c._id === bestCouponID);
        if (best) setSelectedCoupon(best);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpenModal, bestCouponID, coupons]);

    return (
        <Modal
            open={isOpenModal}
            onCancel={onCloseModal}
            footer={null}
            destroyOnHidden
            centered
            width={560}
            closeIcon={null}
            styles={{ body: { padding: 0 } }}
            className="[&_.ant-modal-content]:overflow-hidden [&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:p-0"
        >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-primary-500">
                        <TagOutlined className="text-lg" />
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900">
                        Chọn mã giảm giá
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={onCloseModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
                >
                    <CloseOutlined />
                </button>
            </div>
            <div className="max-h-[450px] overflow-y-auto bg-gray-50 p-5">
                {bestCouponLoading && (
                    <div className="flex items-center justify-center gap-2 pb-3 text-xs text-gray-500">
                        <Spin size="small" />
                        Đang tính mức giảm của các mã...
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    {items.map(({ coupon, info, isBest, eligible, discountAmount }) => (
                        <div key={coupon._id} className="flex flex-col gap-1">
                            <div className="flex min-h-[20px] items-center gap-2">
                                {isBest && (
                                    <span className="rounded bg-green-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                                        Lựa chọn tốt nhất
                                    </span>
                                )}
                                {info &&
                                    (eligible ? (
                                        <span className="text-xs font-semibold text-[#34b766]">
                                            Giảm {formatMoney(discountAmount)}
                                        </span>
                                    ) : (
                                        <span className="text-xs text-gray-500">
                                            {info.eligible
                                                ? "Không áp dụng được cho đơn hàng này"
                                                : `Mua thêm ${formatMoney(
                                                    Math.max(
                                                        info.minOrderValue - (bestCouponData?.orderTotal ?? 0),
                                                        0
                                                    )
                                                )} để sử dụng`}
                                        </span>
                                    ))}
                                {!info && !bestCouponLoading && bestCouponData && (
                                    <span className="text-xs text-gray-500">
                                        Mã không khả dụng
                                    </span>
                                )}
                            </div>

                            <div
                                className={
                                    eligible || !bestCouponData
                                        ? ""
                                        : "pointer-events-none opacity-50 grayscale"
                                }
                            >
                                <TicketPromo
                                    variant="checkout"
                                    coupon={coupon}
                                    isSelected={coupon._id === selectedCoupon?._id}
                                    onSelect={setSelectedCoupon}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {coupons.length === 0 && (
                    <div className="py-10 text-center text-sm text-gray-500">
                        Bạn chưa có mã giảm giá nào.
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CouponModal;

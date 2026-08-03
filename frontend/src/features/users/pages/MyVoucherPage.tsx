import React, { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import GiftIcon from "../../../shared/components/Icons";
import TicketPromo from "../../coupons/components/TicketPromo";
import { useCoupons } from "../../coupons/hooks/useCoupons";
import type { Coupon } from "../../coupons/types/coupon.type";

const MyVoucherPage: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user);
    const { coupons = [] } = useCoupons();

    const myCoupons = useMemo(() => {
        if (!user?.coupons || !Array.isArray(user.coupons)) return [];
        return coupons.filter((coupon: Coupon) => user.coupons.includes(coupon._id));
    }, [coupons, user?.coupons]);

    return (
        <div className="flex flex-col gap-5 max-w-5xl mx-auto p-4">
            <div className="flex items-center gap-2">
                <GiftIcon className="size-6 text-primary-500" />
                <span className="text-sm font-bold text-neutral-800">
                    Danh sách mã giảm giá của bạn ({myCoupons.length})
                </span>
            </div>
            {myCoupons.length > 0 ? (
                <div className="flex gap-10">
                    {myCoupons.map((coupon) => (
                        <TicketPromo
                            key={coupon._id}
                            variant="collect"
                            coupon={coupon}
                            isAdded={true}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center text-sm text-neutral-500 border border-dashed border-neutral-300 rounded-xl">
                    Bạn chưa có mã giảm giá nào.
                </div>
            )}
        </div>
    );
};

export default MyVoucherPage;
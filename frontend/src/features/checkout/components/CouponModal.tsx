import { Modal } from "antd";
import { TagOutlined, CloseOutlined } from "@ant-design/icons";
import type { Coupon } from "../../coupons/types/coupon.type";
import TicketPromo from "../../coupons/components/TicketPromo";

type CouponModalProps = {
    isOpenModal: boolean;
    onCloseModal: () => void;
    coupons: Coupon[];
    selectedCoupon: Coupon | null;
    setSelectedCoupon: (coupon: Coupon) => void;
};

const CouponModal = ({
    isOpenModal,
    onCloseModal,
    coupons,
    setSelectedCoupon,
    selectedCoupon,
}: CouponModalProps) => {
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
                <div className="flex flex-col gap-3">
                    {coupons.map((coupon) => (
                        <TicketPromo
                            key={coupon._id}
                            variant="checkout"
                            coupon={coupon}
                            isSelected={coupon._id === selectedCoupon?._id}
                            onSelect={setSelectedCoupon}
                        />
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
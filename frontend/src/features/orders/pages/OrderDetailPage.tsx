import { Link, useParams } from "react-router-dom";
import { ClockCircleOutlined, SyncOutlined, CarOutlined, CheckCircleOutlined, CloseCircleOutlined, RollbackOutlined, CreditCardOutlined, PhoneOutlined, EnvironmentOutlined, FileTextOutlined, CopyOutlined, UserOutlined, } from "@ant-design/icons";
import { message, Tag } from "antd";
import { useOrder } from "../hooks/useOrder";
const ORDER_STATUS_MAP = {
    PENDING: { label: "Chờ xử lý", color: "warning", icon: <ClockCircleOutlined /> },
    PROCESSING: { label: "Đang xử lý", color: "processing", icon: <SyncOutlined spin /> },
    SHIPPED: { label: "Đã giao cho ĐVVC", color: "purple", icon: <CarOutlined /> },
    DELIVERING: { label: "Đang giao hàng", color: "cyan", icon: <CarOutlined /> },
    DELIVERED: { label: "Giao thành công", color: "success", icon: <CheckCircleOutlined /> },
    CANCELLED: { label: "Đã hủy", color: "error", icon: <CloseCircleOutlined /> },
    RETURNED: { label: "Đã trả hàng", color: "default", icon: <RollbackOutlined /> },
};
const PAYMENT_STATUS_MAP = {
    PENDING: { label: "Chờ thanh toán", color: "orange" },
    PAID: { label: "Đã thanh toán", color: "green" },
    FAILED: { label: "Thanh toán thất bại", color: "red" },
    REFUNDED: { label: "Đã hoàn tiền", color: "default" },
};

const OrderDetailPage = () => {
    const params = useParams();
    const orderID = params.orderID ?? "";
    const { order, loading } = useOrder(orderID);

    const handleCopyCode = (code: any) => {
        navigator.clipboard.writeText(code);
        message.success("Đã sao chép mã vận đơn!");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-neutral-500 font-medium">Đang tải thông tin đơn hàng...</div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
                <p className="text-neutral-600 font-medium text-base">Không tìm thấy thông tin đơn hàng!</p>
                <Link
                    to="/"
                    className="inline-flex items-center justify-center px-5 py-2.5 !bg-primary-500 hover:!bg-primary-600 !text-white text-xs sm:text-sm font-medium rounded-xl transition-colors shadow-sm hover:shadow"
                >
                    Trở về trang chủ
                </Link>
            </div>
        );
    }

    const canRePay = order.paymentDetail?.paymentMethod === "VNPAY" && order.paymentDetail?.paymentStatus === "FAILED";

    const orderStatusConfig = ORDER_STATUS_MAP[order.orderStatus] || ORDER_STATUS_MAP.PENDING;
    const paymentStatusConfig = PAYMENT_STATUS_MAP[order.paymentDetail?.paymentStatus] || PAYMENT_STATUS_MAP.PENDING;

    return (
        <div className="flex flex-col gap-3 mt-4 xl:px-1 px-2 min-h-[70vh] mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-8 flex flex-col gap-4">
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-neutral-100 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                            <h2 className="font-bold text-base sm:text-lg text-neutral-800">
                                Thông tin đơn hàng
                            </h2>
                            <Tag
                                color={orderStatusConfig.color}
                                icon={orderStatusConfig.icon}
                                className="px-3 py-1 text-xs sm:text-sm font-medium rounded-lg !mr-0"
                            >
                                {orderStatusConfig.label}
                            </Tag>
                        </div>

                        <div className="flex flex-col gap-3.5 text-sm">
                            {order.shippingDetails?.shippingOrderCode && (
                                <div className="bg-neutral-50/80 rounded-xl p-3 sm:p-3.5 flex items-center justify-between border border-neutral-100 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2 text-neutral-800 font-semibold">
                                        <CarOutlined className="text-primary-500 text-base shrink-0" />
                                        <span>Mã vận đơn GHN:</span>
                                        <span className="font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
                                            {order.shippingDetails.shippingOrderCode}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleCopyCode(order.shippingDetails.shippingOrderCode)}
                                        className="text-neutral-500 hover:!text-primary-500 hover:bg-neutral-100 transition-all p-1.5 rounded-lg flex items-center gap-1 text-xs font-medium shrink-0"
                                        title="Sao chép mã vận đơn"
                                    >
                                        <CopyOutlined />
                                        <span className="hidden sm:inline">Sao chép</span>
                                    </button>
                                </div>
                            )}

                            <div className="bg-neutral-50/80 rounded-xl p-3.5 sm:p-4 border border-neutral-100 flex flex-col gap-3 text-xs sm:text-sm">
                                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                                    <UserOutlined className="text-neutral-400" />
                                    <span>Người nhận hàng</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap text-neutral-900 font-semibold text-sm sm:text-base">
                                    <span>{order.shippingAddress?.fullName}</span>
                                    <span className="text-neutral-300 font-normal">|</span>
                                    <span className="text-neutral-600 font-normal flex items-center gap-1 text-xs sm:text-sm">
                                        <PhoneOutlined className="text-neutral-400" /> {order.shippingAddress?.phone}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2 text-neutral-600 pt-1 border-t border-neutral-200/50">
                                    <EnvironmentOutlined className="text-primary-500 mt-0.5 shrink-0 text-sm" />
                                    <p className="leading-relaxed text-neutral-700">
                                        {order.shippingAddress?.address}, {order.shippingAddress?.ward}, {order.shippingAddress?.district}, {order.shippingAddress?.province}
                                    </p>
                                </div>
                                {order.shippingAddress?.note && (
                                    <div className="mt-1 text-xs text-neutral-600 bg-white p-2.5 rounded-lg border border-neutral-200/60 flex items-start gap-1.5 shadow-2xs">
                                        <FileTextOutlined className="mt-0.5 text-neutral-400 shrink-0" />
                                        <span>
                                            <strong className="text-neutral-700">Ghi chú:</strong> {order.shippingAddress.note}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-neutral-100 shadow-sm flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                            <span className="text-sm sm:text-base font-medium text-neutral-800">
                                Sản phẩm ({order.items?.length || 0})
                            </span>
                        </div>

                        <div className="divide-y divide-neutral-100">
                            {order.items?.map((item, index) => {
                                const discountedPrice = Math.round(
                                    item.price * (1 - (item.discountPercentage || 0) / 100)
                                );

                                return (
                                    <div key={item.productID || index} className="py-4 flex flex-col gap-3">
                                        <div className="flex items-center justify-between gap-3 sm:gap-4 relative py-1">
                                            <div className="flex items-center gap-3 shrink-0">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-neutral-100 p-1 flex items-center justify-center shrink-0">
                                                    <img
                                                        className="w-full h-full object-contain"
                                                        src={item.mainImage}
                                                        alt={item.title}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                                                <div
                                                    className="text-xs sm:text-sm font-medium !text-neutral-800 line-clamp-2"
                                                >
                                                    {item.title}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm sm:text-base font-bold text-primary-500">
                                                        {discountedPrice.toLocaleString("vi-VN")}đ
                                                    </span>
                                                    {item.discountPercentage > 0 && (
                                                        <span className="text-xs text-neutral-400 line-through">
                                                            {item.price.toLocaleString("vi-VN")}đ
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <span className="text-xs sm:text-sm font-medium text-neutral-600">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                <div className="lg:col-span-4 lg:sticky lg:top-25 flex flex-col gap-4 bg-white rounded-xl p-4 sm:p-5 border border-neutral-100 shadow-sm">
                    <h2 className="font-bold text-base sm:text-lg text-neutral-800 border-b border-neutral-100 pb-3">
                        Thông tin thanh toán
                    </h2>

                    <div className="flex flex-col gap-4 text-sm pt-1">
                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center justify-between text-neutral-600">
                                <span>Tổng tiền hàng</span>
                                <span className="font-semibold text-neutral-800">
                                    {order.pricing?.subTotal?.toLocaleString("vi-VN")}đ
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-neutral-600">
                                <span>Giảm giá</span>
                                <span className="font-semibold text-[#34b766]">
                                    -{order.pricing?.discountAmount?.toLocaleString("vi-VN")}đ
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-neutral-600">
                                <span>Phí vận chuyển</span>
                                <span className="font-semibold text-neutral-800">
                                    {order.pricing?.shippingFee > 0
                                        ? `${order.pricing.shippingFee.toLocaleString("vi-VN")}đ`
                                        : "0đ"}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-neutral-100 pt-3 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-bold text-base text-neutral-900">Tổng tiền</div>
                                </div>
                                <span className="text-lg font-semibold text-primary-500">
                                    {order.pricing?.totalPrice?.toLocaleString("vi-VN")}đ
                                </span>
                            </div>
                        </div>
                        <div className="border-t border-neutral-100 pt-3 flex flex-col gap-2.5">
                            <div className="flex items-center justify-between text-neutral-600">
                                <span>Phương thức</span>
                                <span className="font-semibold text-neutral-800 flex items-center gap-1">
                                    <CreditCardOutlined className="text-primary-500" />
                                    {order.paymentDetail?.paymentMethod}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-neutral-600">
                                <span>Trạng thái</span>
                                <Tag color={paymentStatusConfig.color} className="mr-0 font-medium">
                                    {paymentStatusConfig.label}
                                </Tag>
                            </div>
                        </div>
                    </div>
                    {canRePay && (
                        <div className="mt-2 flex flex-col gap-2">
                            <Link
                                to={`/payment/${order._id}`}
                                className="w-full flex flex-col items-center justify-center rounded-md !text-white p-2.5 active:scale-[0.99] transition-all !bg-primary-500 hover:!bg-primary-600 text-center shadow-sm"
                            >
                                <strong className="text-base tracking-wide flex items-center gap-2">
                                    <CreditCardOutlined /> THANH TOÁN NGAY
                                </strong>
                                <span className="text-[11px] font-normal opacity-90">
                                    Thanh toán lại qua cổng VNPAY
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { DatePicker, Pagination } from "antd";
import type { Dayjs } from "dayjs";
import { useOrders } from "../../orders/hooks/useOrders";
import { ArrowRightSlide } from "../../../shared/components/Icons";
const { RangePicker } = DatePicker;
export type OrderStatus =
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERING"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";

interface StatusConfigItem {
    key: OrderStatus | "ALL";
    label: string;
}

const ORDER_STATUSES: StatusConfigItem[] = [
    { key: "ALL", label: "Tất cả" },
    { key: "PENDING", label: "Chờ xác nhận" },
    { key: "PROCESSING", label: "Đang xử lý" },
    { key: "SHIPPED", label: "Đã xuất kho" },
    { key: "DELIVERING", label: "Đang giao" },
    { key: "DELIVERED", label: "Đã giao" },
    { key: "CANCELLED", label: "Đã hủy" },
    { key: "RETURNED", label: "Trả hàng" },
];

const renderStatusBadge = (status: OrderStatus) => {
    const statusMap: Record<OrderStatus, { label: string; color: string }> = {
        PENDING: { label: "Chờ xác nhận", color: "bg-amber-100 text-amber-700" },
        PROCESSING: { label: "Đang xử lý", color: "bg-blue-100 text-blue-700" },
        SHIPPED: { label: "Đã xuất kho", color: "bg-indigo-100 text-indigo-700" },
        DELIVERING: { label: "Đang giao hàng", color: "bg-purple-100 text-purple-700" },
        DELIVERED: { label: "Đã giao thành công", color: "bg-emerald-100 text-emerald-700" },
        CANCELLED: { label: "Đã hủy", color: "bg-rose-100 text-rose-700" },
        RETURNED: { label: "Trả hàng/Hoàn tiền", color: "bg-gray-200 text-gray-700" },
    };

    const config = statusMap[status] || {
        label: status,
        color: "bg-neutral-100 text-neutral-700",
    };

    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${config.color}`}>
            {config.label}
        </span>
    );
};
const PAGE_SIZE = 3;

const MyOrdersPage: React.FC = () => {
    const { orders = [] } = useOrders();

    // States lọc & phân trang
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "ALL">("ALL");
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Logic lọc danh sách đơn hàng
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            // 1. Lọc theo trạng thái
            const matchStatus =
                selectedStatus === "ALL" || order.orderStatus === selectedStatus;

            // 2. Lọc theo khoảng ngày
            let matchDate = true;
            if (dateRange && dateRange[0] && dateRange[1]) {
                const orderTime = new Date(order.createdAt).getTime();
                const startTime = dateRange[0].startOf("day").valueOf();
                const endTime = dateRange[1].endOf("day").valueOf();

                matchDate = orderTime >= startTime && orderTime <= endTime;
            }

            return matchStatus && matchDate;
        });
    }, [orders, selectedStatus, dateRange]);

    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        return filteredOrders.slice(startIndex, startIndex + PAGE_SIZE);
    }, [filteredOrders, currentPage]);

    const handleStatusChange = (status: OrderStatus | "ALL") => {
        setSelectedStatus(status);
        setCurrentPage(1);
    };

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        setDateRange(dates);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col gap-5 max-w-5xl mx-auto p-4">
            {/* 1. Bộ lọc trạng thái (Active text primary-500 + border bottom) */}
            <div className="flex items-center gap-6 overflow-x-auto border-b border-neutral-200 scrollbar-none">
                {ORDER_STATUSES.map((tab) => {
                    const count =
                        tab.key === "ALL"
                            ? orders.length
                            : orders.filter((o) => o.orderStatus === tab.key).length;

                    const isActive = selectedStatus === tab.key;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => handleStatusChange(tab.key)}
                            className={`flex items-center gap-1.5 pb-3 text-sm font-medium whitespace-nowrap transition-colors ${isActive
                                    ? "text-primary-500 border-b-2 border-primary-500 font-semibold"
                                    : "text-neutral-600 hover:text-neutral-900"
                                }`}
                        >
                            <span>{tab.label}</span>
                            {count > 0 && (
                                <span
                                    className={`text-xs px-1.5 py-0.5 rounded-full ${isActive
                                            ? "bg-primary-50 text-primary-500"
                                            : "bg-neutral-100 text-neutral-600"
                                        }`}
                                >
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* 2. Bộ lọc khoảng ngày (Chữ đậm, sát ô chọn ngày, không background) */}
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-neutral-800 whitespace-nowrap">
                    Lịch sử mua hàng:
                </span>
                <RangePicker
                    onChange={(dates) =>
                        handleDateChange(dates as [Dayjs | null, Dayjs | null] | null)
                    }
                    placeholder={["Từ ngày", "Đến ngày"]}
                    format="DD/MM/YYYY"
                />
            </div>

            {/* 3. Danh sách đơn hàng (Bỏ hover hiệu ứng) */}
            <div className="flex flex-col gap-4">
                {paginatedOrders.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 border border-dashed border-neutral-300 rounded-xl">
                        Không tìm thấy đơn hàng nào phù hợp.
                    </div>
                ) : (
                    paginatedOrders.map((item) => {
                        const firstItem = item.items?.[0];
                        const otherItemsCount = (item.items?.length || 1) - 1;

                        return (
                            <div
                                key={item._id}
                                className="rounded-xl border border-neutral-300 p-4 bg-white flex flex-col gap-4"
                            >
                                {/* Header card */}
                                <div className="flex justify-between items-center border-b border-neutral-100 pb-3 text-sm">
                                    <div className="flex items-center gap-2 text-neutral-600">
                                        <span>
                                            Mã đơn:{" "}
                                            <strong className="text-neutral-800">
                                                #{item._id.slice(-6)}
                                            </strong>
                                        </span>
                                        <span>•</span>
                                        <span>
                                            {new Date(item.createdAt).toLocaleString("vi-VN", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <div>{renderStatusBadge(item.orderStatus)}</div>
                                </div>

                                {/* Body card */}
                                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                        <img
                                            src={firstItem?.mainImage || "/placeholder.png"}
                                            alt={firstItem?.title || "Product image"}
                                            className="size-20 object-cover rounded-lg border border-neutral-200 shrink-0"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold text-neutral-800 line-clamp-1">
                                                {firstItem?.title}
                                            </p>
                                            <div className="text-sm text-neutral-500 flex items-center gap-2">
                                                <span>Số lượng: {firstItem?.quantity}</span>
                                                <span>|</span>
                                                <span className="text-neutral-700 font-medium">
                                                    {firstItem?.price?.toLocaleString("vi-VN")} đ
                                                </span>
                                            </div>
                                            {otherItemsCount > 0 && (
                                                <p className="text-xs text-neutral-500 italic">
                                                    Cùng {otherItemsCount} sản phẩm khác
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Pricing & Navigation */}
                                    <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 gap-2">
                                        <div className="text-right">
                                            <span className="text-xs text-neutral-500 block">
                                                Tổng thanh toán
                                            </span>
                                            <span className="text-lg font-bold text-rose-600">
                                                {item.pricing?.totalPrice?.toLocaleString("vi-VN")} đ
                                            </span>
                                        </div>

                                        <Link
                                            to={`/orders/${item._id}`}
                                            className="flex gap-1.5 items-center text-sm font-medium text-neutral-700"
                                        >
                                            Xem chi tiết
                                            <ArrowRightSlide className="size-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            {filteredOrders.length > PAGE_SIZE && (
                <div className="flex justify-center pt-2">
                    <Pagination
                        current={currentPage}
                        pageSize={PAGE_SIZE}
                        total={filteredOrders.length}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </div>
    );
};

export default MyOrdersPage;
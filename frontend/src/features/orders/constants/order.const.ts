export const ORDER_STATUS = {
    PENDING: {
        color: "gold",
        text: "Chờ xác nhận",
    },
    PROCESSING: {
        color: "blue",
        text: "Đang xử lý",
    },
    SHIPPED: {
        color: "cyan",
        text: "Đã gửi hàng",
    },
    DELIVERING: {
        color: "processing",
        text: "Đang giao",
    },
    DELIVERED: {
        color: "green",
        text: "Đã giao",
    },
    CANCELLED: {
        color: "red",
        text: "Đã hủy",
    },
    RETURNED: {
        color: "volcano",
        text: "Đã hoàn trả",
    },
};

export const PAYMENT_STATUS = {
    PENDING: {
        color: "orange",
        text: "Chưa thanh toán",
    },
    PAID: {
        color: "green",
        text: "Đã thanh toán",
    },
    FAILED: {
        color: "red",
        text: "Thanh toán thất bại",
    },
    REFUNDED: {
        color: "purple",
        text: "Đã hoàn tiền",
    },
};
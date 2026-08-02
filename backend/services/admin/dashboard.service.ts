import Order from "../../models/order.model";
import User from "../../models/user.model";

const calculateChange = (current: number, previous: number) => {
    if (previous === 0) {
        return current > 0 ? "100.00" : "0.00";
    }
    return (((current - previous) / previous) * 100).toFixed(2);
};

export const getStatsService = async () => {
    const now = new Date();
    // Ngày mùng 1 của tháng này tới ngày hiện tại
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfCurrentMonth = now;

    // ngày mung 1 của tháng trước tới ngày cuối cùng của tháng trước
    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    // Dùng promise.all để thực hiện đồng thời 2 query
    const [orderStatsResult, userStatsResult] = await Promise.all([
        Order.aggregate([
            //lọc các đơn hàng từ đầu tháng trước tới hiện tại
            {
                $match: {
                    orderStatus: "DELIVERED",
                    createdAt: { $gte: startOfPreviousMonth, $lte: endOfCurrentMonth, },
                },
            },
            {
                $facet: {
                    // luồng tính toán cho tháng này
                    currentMonth: [
                        {
                            $match: {
                                createdAt: { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                totalRevenue: { $sum: "$pricing.totalPrice" },
                                totalOrders: { $sum: 1 },
                                totalProductsSold: {
                                    $sum: {
                                        $reduce: {
                                            input: "$items",
                                            initialValue: 0,
                                            in: { $add: ["$$value", "$$this.quantity"] },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                    // luồng tính toán cho tháng trước
                    previousMonth: [
                        {
                            $match: {
                                createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                totalRevenue: { $sum: "$pricing.totalPrice" },
                                totalOrders: { $sum: 1 },
                                totalProductsSold: {
                                    $sum: {
                                        $reduce: {
                                            input: "$items",
                                            initialValue: 0,
                                            in: { $add: ["$$value", "$$this.quantity"] },
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        ]),
        User.aggregate([
            // lọc các user từ đầu tháng trước tới hiện tại
            {
                $match: {
                    status: "active",
                    createdAt: { $gte: startOfPreviousMonth, $lte: endOfCurrentMonth, },
                }
            },
            {
                $facet: {
                    currentMonth: [
                        {
                            $match: { createdAt: { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth }, },
                        },
                        {
                            $count: "totalNewUsers",
                        },
                    ],
                    previousMonth: [
                        {
                            $match: { createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth }, },
                        },
                        {
                            $count: "totalNewUsers",
                        },
                    ],
                },
            },
        ]),
    ]);
    // Trích xuất dữ liệu trả về từ Order Pipeline
    const currentOrderData = orderStatsResult[0]?.currentMonth[0] || {
        totalRevenue: 0,
        totalOrders: 0,
        totalProductsSold: 0,
    };
    const previousOrderData = orderStatsResult[0]?.previousMonth[0] || {
        totalRevenue: 0,
        totalOrders: 0,
        totalProductsSold: 0,
    };

    // Trích xuất dữ liệu trả về từ User Pipeline
    const currentUsers = userStatsResult[0]?.currentMonth[0]?.totalNewUsers || 0;
    const previousUsers = userStatsResult[0]?.previousMonth[0]?.totalNewUsers || 0;

    return {
        data: {
            totalRevenue: {
                title: "Total Revenue",
                value: currentOrderData.totalRevenue,
                change: calculateChange(currentOrderData.totalRevenue, previousOrderData.totalRevenue),
                isIncrease: currentOrderData.totalRevenue >= previousOrderData.totalRevenue,
                timeframe: "vs last month",
            },
            totalOrders: {
                title: "Total Orders",
                value: currentOrderData.totalOrders,
                change: calculateChange(currentOrderData.totalOrders, previousOrderData.totalOrders),
                isIncrease: currentOrderData.totalOrders >= previousOrderData.totalOrders,
                timeframe: "vs last month",
            },
            totalProductsSold: {
                title: "Total Products Sold",
                value: currentOrderData.totalProductsSold,
                change: calculateChange(currentOrderData.totalProductsSold, previousOrderData.totalProductsSold),
                isIncrease: currentOrderData.totalProductsSold >= previousOrderData.totalProductsSold,
                timeframe: "vs last month",
            },
            totalNewUsers: {
                title: "Total New Users",
                value: currentUsers,
                change: calculateChange(currentUsers, previousUsers),
                isIncrease: currentUsers >= previousUsers,
                timeframe: "vs last month",
            },
        },
    };
};
export const orderPipelineService = async () => {
    const orderResult = await Order.aggregate([
        {
            $group: {
                _id: "$orderStatus",
                count: { $sum: 1, },
            },
        },
    ]);

    const orderMap = new Map( orderResult.map((item) => [item._id, item.count]) );

    return {
        data: [
            {
                title: "Pending",
                count: orderMap.get("PENDING") ?? 0,
                description: "Awaiting confirmation",
            },
            {
                title: "Processing",
                count:
                    (orderMap.get("PROCESSING") ?? 0) +
                    (orderMap.get("SHIPPED") ?? 0),
                description: "Packing & Preparing",
            },
            {
                title: "On Delivery",
                count: orderMap.get("DELIVERING") ?? 0,
                description: "Shipping in progress",
            },
            {
                title: "Completed",
                count: orderMap.get("DELIVERED") ?? 0,
                description: "Delivered successfully",
            },
            {
                title: "Cancelled",
                count:
                    (orderMap.get("CANCELLED") ?? 0) +
                    (orderMap.get("RETURNED") ?? 0),
                description: "Refunded / Cancelled",
            },
        ],
    };
};
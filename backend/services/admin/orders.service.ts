import Order from "../../models/order.model";
import { GetOrdersQuery } from "../../validations/admin/order.validation";

export const getOrdersService = async (query: GetOrdersQuery) => {
    const { orderStatus, fromDate, toDate, sort, page = 1, limit = 5, } = query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Filter
    const match: any = {
        deleted: false,
    };

    if (orderStatus) {
        match.orderStatus = orderStatus;
    }

    if (fromDate || toDate) {
        match.createdAt = {};

        if (fromDate) {
            match.createdAt.$gte = new Date(fromDate);
        }

        if (toDate) {
            match.createdAt.$lte = new Date(toDate);
        }
    }

    // Sort
    let sortOption: any = {};

    switch (sort) {
        case "created-asc":
            sortOption = { createdAt: 1 };
            break;

        case "created-desc":
            sortOption = { createdAt: -1 };
            break;

        case "price-asc":
            sortOption = { "pricing.totalPrice": 1 };
            break;

        case "price-desc":
            sortOption = { "pricing.totalPrice": -1 };
            break;

        default:
            sortOption = { createdAt: -1 };
            break;
    }

    const pipeline: any[] = [
        {
            $match: match,
        },
        {
            $facet: {
                orders: [
                    {
                        $sort: sortOption,
                    },
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limitNum,
                    },
                    {
                        $project: {
                            items: 1,
                            shippingAddress: 1,
                            paymentDetail: 1,
                            orderStatus: 1,
                            pricing: 1,
                            createdAt: 1,
                        },
                    },
                ],
                total: [
                    {
                        $count: "count",
                    },
                ],
            },
        },
    ];

    const result = await Order.aggregate(pipeline).allowDiskUse(true);

    const orders = result[0].orders;
    const total = result[0].total[0]?.count || 0;

    return {
        data: orders,
        meta: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum),
        },
    };
};
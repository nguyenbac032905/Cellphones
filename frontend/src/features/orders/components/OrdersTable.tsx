import { Button, Image, message, Popconfirm, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";

import type { PaginationMeta } from "../../../shared/types/common.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { Order } from "../types/order.type";
import type { OrderQuery } from "../types/orderAdmin.type";

type Props = {
    orders: Order[];
    meta: PaginationMeta;
    updateQuery: (values: Partial<OrderQuery>) => void;
    refetch: () => Promise<void>;
};

const OrdersTable = ({ orders, meta, updateQuery, refetch, }: Props) => {
    const handleDelete = async (id: string) => {
        try {
            console.log("delted")
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    };

    const paymentStatusColor = {
        PENDING: "gold",
        PAID: "success",
        FAILED: "error",
        REFUNDED: "purple",
    } as const;

    const orderStatusColor = {
        PENDING: "gold",
        PROCESSING: "blue",
        SHIPPED: "cyan",
        DELIVERING: "purple",
        DELIVERED: "success",
        CANCELLED: "error",
        RETURNED: "volcano",
    } as const;

    const columns = [
        {
            title: "index",
            key: "index",
            width: 70,
            align: "center" as const,
            render: (_: any, __: Order, index: number) =>
                (Number(meta.page) - 1) * Number(meta.limit) + index + 1,
        },
        {
            title: "Item",
            key: "item",
            render: (_: any, record: Order) => {
                const firstItem = record.items[0];

                if (!firstItem) return null;

                return (
                    <div className="flex items-center gap-3">
                        <div className="shrink-0">
                            <Image
                                src={firstItem.mainImage}
                                width={64}
                                height={64}
                                preview={false}
                                style={{
                                    objectFit: "cover",
                                    borderRadius: 8,
                                }}
                            />
                        </div>

                        <div className="min-w-0">
                            <div className="font-medium line-clamp-2">
                                {firstItem.title}
                            </div>

                            <div className="text-xs text-gray-500">
                                Quantity: {firstItem.quantity}
                            </div>

                            {record.items.length > 1 && (
                                <div className="text-xs text-blue-500">
                                    và {record.items.length - 1} sản phẩm nữa
                                </div>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            title: "Customer",
            key: "customer",
            render: (_: any, record: Order) => (
                <div>
                    <div className="font-medium">
                        {record.shippingAddress.fullName}
                    </div>
                    <div className="text-gray-500 text-xs">
                        {record.shippingAddress.phone}
                    </div>
                </div>
            ),
        },
        {
            title: "Total",
            dataIndex: ["pricing", "totalPrice"],
            key: "totalPrice",
            align: "right" as const,
            render: (price: number) =>
                price.toLocaleString("vi-VN") + " đ",
        },
        {
            title: "Payment Status",
            dataIndex: ["paymentDetail", "paymentStatus"],
            key: "paymentStatus",
            align: "center" as const,
            render: (
                status:
                    | "PENDING"
                    | "PAID"
                    | "FAILED"
                    | "REFUNDED"
            ) => (
                <Tag color={paymentStatusColor[status]}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Order Status",
            dataIndex: "orderStatus",
            key: "orderStatus",
            align: "center" as const,
            render: (status: Order["orderStatus"]) => (
                <Tag color={orderStatusColor[status]}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) =>
                new Date(date).toLocaleString("vi-VN"),
        },
        {
            title: "Actions",
            key: "actions",
            align: "center" as const,
            render: (_: any, record: Order) => (
                <Space>
                    <Link to={`/admin/orders/details/${record._id}`}>
                        <Button
                            color="default"
                            variant="outlined"
                        >
                            Detail
                        </Button>
                    </Link>

                    <Popconfirm
                        title="Delete Order"
                        description="Are you sure you want to delete this order?"
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{
                            danger: true,
                        }}
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button
                            color="danger"
                            variant="outlined"
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowKey="_id"
            columns={columns}
            dataSource={orders}
             scroll={{ x: 1200 }}
            className="overflow-hidden rounded-2xl border border-gray-200"
            pagination={{
                placement: ["bottomCenter"],
                current: Number(meta.page),
                pageSize: Number(meta.limit),
                total: meta.total,
                onChange: (page) =>
                    updateQuery({
                        page: String(page),
                    }),
            }}
        />
    );
};

export default OrdersTable;
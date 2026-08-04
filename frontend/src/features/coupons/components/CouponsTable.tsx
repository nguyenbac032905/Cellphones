import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { Coupon } from "../types/coupon.type";

type Props = {
    coupons: Coupon[];
    refetch: () => Promise<void>;
};

const CouponsTable = ({ coupons, refetch }: Props) => {

    const columns: ColumnsType<Coupon> = [
        {
            title: "index",
            render: (_, __, index) => index + 1,
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Discount Type",
            dataIndex: "discountType",
            render: (type: "percent" | "fixed") => (
                <Tag color={type === "percent" ? "blue" : "green"}>
                    {type === "percent" ? "Percent" : "Fixed"}
                </Tag>
            ),
        },
        {
            title: "Discount",
            render: (_, record) =>
                record.discountType === "percent"
                    ? `${record.discountValue}%`
                    : `${record.discountValue.toLocaleString()}đ`,
        },
        {
            title: "Max Discount",
            render: (_, record) =>
                record.maxDiscount
                    ? `${record.maxDiscount.toLocaleString()}đ`
                    : "-",
        },
        {
            title: "Min Order",
            render: (_, record) =>
                `${record.minOrderValue.toLocaleString()}đ`,
        },
        {
            title: "Expire At",
            dataIndex: "expireAt",
            render: (date: string) =>
                new Date(date).toLocaleDateString("vi-VN"),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: "active" | "inactive") => (
                <Tag color={status === "active" ? "green" : "red"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Actions",
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        title="Delete Coupon"
                        description="Are you sure you want to delete this coupon?"
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{
                            danger: true
                        }}
                        onConfirm={async () => {
                            try {
                                console.log("deleted")
                            } catch (error) {
                                message.error(getErrorMessage(error));
                            }
                        }}
                    >
                        <Button
                            danger
                            type="default"
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
            dataSource={coupons}
            columns={columns}
            pagination={false}
            className="overflow-hidden rounded-2xl border border-gray-200"
            scroll={{ x: 1000 }}
        />
    );
};

export default CouponsTable;
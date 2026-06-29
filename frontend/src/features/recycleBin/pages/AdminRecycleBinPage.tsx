import { useMemo, useState } from "react";
import {
    Button,
    Card,
    Image,
    Popconfirm,
    Table,
    Tag,
    Typography,
    message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";

import LoadingScreen from "../../../shared/components/LoadingScreen";
import AdminTitle from "../../../shared/components/AdminTitle";
import { useRecycleBinProduct } from "../hooks/useRecycleBinProduct";
import type { ProductDeleted } from "../types/products.type";
import { useRestoreProduct } from "../hooks/useRestoreProduct";
import { useForceProduct } from "../hooks/useForceProduct";

const { Text } = Typography;


const AdminRecycleBinPage = () => {
    const { products, loading, refetch } = useRecycleBinProduct();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const { restoreProduct, error: errorRestore } = useRestoreProduct();
    const { forceProduct, error: errorForce } = useForceProduct();

    const handleRestore = async (id: string) => {
        try {
            setLoadingId(id);
            const result = await restoreProduct(id);
            if (result?.success) {
                message.success(result.message);
                await refetch();
            } else {
                message.error(errorRestore);
            }

        } catch (error) {
            message.error("Restore product failed");
        } finally {
            setLoadingId(null);
        }
    };

    const handleForceDelete = async (id: string) => {
        try {
            setLoadingId(id);
            const result = await forceProduct(id);

            if (result?.success) {
                message.success(result.message);
                await refetch();
            } else {
                message.error(errorForce);
            }
        } catch (error) {
            message.error("Force delete product failed");
        } finally {
            setLoadingId(null);
        }
    };

    const columns: ColumnsType<ProductDeleted> = useMemo(
        () => [
            {
                title: "Image",
                dataIndex: "images",
                key: "images",
                width: 100,
                render: (images: ProductDeleted["images"]) => {
                    const mainImage =
                        images?.find((img) => img.isMain)?.url ||
                        images?.[0]?.url;

                    return (
                        <Image
                            src={mainImage}
                            alt="product"
                            width={60}
                            height={60}
                            preview={false}
                            className="rounded-lg object-cover"
                        />
                    );
                },
            },
            {
                title: "Title",
                dataIndex: "title",
                key: "title",
                ellipsis: true,
                render: (title: string) => (
                    <Text strong className="text-[15px]">
                        {title}
                    </Text>
                ),
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                width: 130,
                render: (status: ProductDeleted["status"]) => (
                    <Tag
                        color={status === "active" ? "success" : "error"}
                        className="px-3 py-1 text-sm font-medium capitalize"
                    >
                        {status}
                    </Tag>
                ),
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price",
                width: 150,
                render: (price: number) => (
                    <Tag
                        color="gold"
                        className="px-3 py-1 text-sm font-medium"
                    >
                        {price.toLocaleString("vi-VN")} đ
                    </Tag>
                ),
            },
            {
                title: "Sold",
                dataIndex: "sold",
                key: "sold",
                width: 120,
                render: (sold: number) => (
                    <Tag
                        color="geekblue"
                        className="px-3 py-1 text-sm font-medium"
                    >
                        {sold} sold
                    </Tag>
                ),
            },
            {
                title: "Deleted At",
                dataIndex: "deletedAt",
                key: "deletedAt",
                width: 220,
                render: (deletedAt: string) => (
                    <Tag color="red" className="px-3 py-1 text-sm">
                        {deletedAt
                            ? new Date(deletedAt).toLocaleString("vi-VN")
                            : "Ngày xóa là -"}
                    </Tag>
                ),
            },
            {
                title: "Actions",
                key: "actions",
                width: 260,
                fixed: "right",
                render: (_, record) => (
                    <div className="flex items-center gap-2">
                        <Popconfirm
                            title="Restore this product?"
                            okText="Restore"
                            cancelText="Cancel"
                            onConfirm={() => handleRestore(record._id)}
                        >
                            <Button
                                icon={<ReloadOutlined />}
                                loading={loadingId === record._id}
                                className="border-green-500 text-green-600 hover:!border-green-600 hover:!text-green-700"
                                variant="outlined"
                            >
                                Restore
                            </Button>
                        </Popconfirm>

                        <Popconfirm
                            title="Delete permanently?"
                            description="This action cannot be undone."
                            okText="Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true }}
                            onConfirm={() => handleForceDelete(record._id)}
                        >
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                loading={loadingId === record._id}
                                variant="outlined"
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                ),
            }
        ],
        [loadingId]
    );

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="flex flex-col gap-5">
            <AdminTitle
                title="Recycle Bin Products"
                description="Manage deleted products and restore them when needed"
            />
            <Card className="rounded-2xl shadow-sm">
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={products}
                    bordered
                    scroll={{ x: 1200 }}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: false,
                    }}
                />
            </Card>
        </div>
    );
};

export default AdminRecycleBinPage;
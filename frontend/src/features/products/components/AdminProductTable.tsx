import { Button, Image, Input, message, Popconfirm, Space, Switch, Table } from "antd";
import type { Product, ProductListResponse, ProductQuery } from "../types/products.type";
import { Link } from "react-router-dom";
import { useAdminUpdateProduct } from "../hooks/useAdminUpdateProduct";
import { useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useAdminDeleteProduct } from "../hooks/useAdminDeleteProduct";
type Props = {
    updateQuery: (values: Partial<ProductQuery>) => void,
    data: ProductListResponse,
    refetch: () => Promise<void>,
    setSelectedRows: React.Dispatch<React.SetStateAction<Product[]>>
}
const ProductTable = ({ data,updateQuery, refetch, setSelectedRows}: Props) => {
    const {updateProduct,error: errorUpdate} = useAdminUpdateProduct();
    const [updatingId, setUpdatingId] = useState("");
    const {deleteProduct, error: errorDelete} = useAdminDeleteProduct();

    const columns = [
        {
            title: "Position",
            dataIndex: "position",
            key: "position",
            render: (position: number,record: Product) => (
                <Input 
                    defaultValue={position}
                    disabled={record._id === updatingId}
                    style={{ width: 60, textAlign: "center" }}
                    onBlur={async (e) => {
                        const newPosition = Number(e.target.value);
                        if (newPosition === position) return;

                        try {
                            setUpdatingId(record._id);
                            await updateProduct({ position: newPosition }, record._id);
                            message.success("Cập nhật vị trí thành công!");
                        } catch (error) {
                            message.error(getErrorMessage(error));
                        } finally {
                            setUpdatingId("");
                        }
                    }}
                />
            )
        },
        {
            title: "Image",
            dataIndex: "images",
            key: "images",
            render: (_: any, record: any) => {
                const mainImage = record.images?.find((img: any) => img.isMain)?.url || record?.images?.[0];
                if (!mainImage) {
                    return (
                        <div className="h-[100px] w-[100px] rounded bg-gray-200" />
                    );
                }
                return (
                    <Image
                        src={mainImage}
                        width={100}
                        style={{ objectFit: "cover", borderRadius: 6 }}
                    />
                );
            },
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: number) =>
                price.toLocaleString("vi-VN") + " đ",
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Status",
            key: "status",
            render: (_: any, record: Product) => (
                <Switch
                    checked={record.status === "active"}
                    loading={updatingId === record._id}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                    onChange={async (checked) => {
                        try {
                            setUpdatingId(record._id);
                            await updateProduct({status: checked ? "active" : "inactive"},record._id);
                            message.success("Product updated successfully!");
                            await refetch();
                        } catch (error) {
                            message.error(getErrorMessage(errorUpdate));
                        } finally {
                            setUpdatingId("");
                        }
                    }}
                />
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Product) => (
                <Space>
                    <Link to={`/admin/products/details/${record._id}`}>
                        <Button color="default" variant="outlined" style={{ width: 65 }}>
                            Detail
                        </Button>
                    </Link>
                    <Link to={`/admin/products/edit/${record._id}`}>
                        <Button color="primary" variant="outlined" style={{ width: 65 }}>
                            Update
                        </Button>
                    </Link>
                    <Popconfirm
                        title="Delete Product"
                        description="Are you sure you want to delete this product?"
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true, loading: updatingId === record._id }}
                        onConfirm={async () => {
                            try {
                                setUpdatingId(record._id);

                                await deleteProduct(record._id);

                                message.success("Product deleted successfully!");

                                await refetch();
                            } catch (error) {
                                message.error(getErrorMessage(error));
                            } finally {
                                setUpdatingId("");
                            }
                        }}
                    >
                        <Button
                            color="danger"
                            variant="outlined"
                            style={{ width: 65 }}
                            loading={updatingId === record._id}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table 
                dataSource={data.products}
                columns={columns}
                rowKey="_id"
                className="overflow-hidden rounded-2xl border border-gray-200"
                rowSelection={{ 
                    type: "checkbox",
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    }
                }}
                scroll={{x:1000}}
                pagination={{
                    placement: ["bottomCenter"],
                    current: Number(data.pagination.page || 1),
                    pageSize: Number(data.pagination.limit || 4),
                    total: data.pagination.total,
                    onChange: (page) => {
                        updateQuery({
                            page: Number(page)
                        });
                    }
                }} 
            />
        </>
    )
};

export default ProductTable;
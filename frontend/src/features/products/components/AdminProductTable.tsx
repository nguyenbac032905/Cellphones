import { Button, Image, Input, Space, Switch, Table } from "antd";
import type { Product, ProductListResponse, ProductQuery } from "../types/products.type";
import { Link } from "react-router-dom";
import { useAdminUpdateProduct } from "../hooks/useAdminUpdateProduct";
import { useState } from "react";
type Props = {
    query: ProductQuery,
    updateQuery: (values: Partial<ProductQuery>) => void,
    data: ProductListResponse,
    refetch: () => Promise<void>
}
const ProductTable = ({ data,query,updateQuery, refetch}: Props) => {
    const {updateProduct,loading,error} = useAdminUpdateProduct();
    const [updatingId, setUpdatingId] = useState("");

    const columns = [
        {
            title: "Position",
            dataIndex: "position",
            key: "position",
            render: (position: number) => (
                <Input value={position} style={{width: 32}}/>
            )
        },
        {
            title: "Image",
            dataIndex: "thumbnail",
            key: "thumbnail",
            render: (thumbnail: string) => (
                <Image src={thumbnail} width={100} />
            ),
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
                    loading={loading}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                    onChange={async (checked) => {
                        console.log(checked)
                        try {
                            setUpdatingId(record._id);
                            await updateProduct({status: checked ? "active" : "inactive"},record._id);
                            await refetch();
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
                            Chi tiết
                        </Button>
                    </Link>
                    <Link to={`/admin/products/edit/${record._id}`}>
                        <Button color="primary" variant="outlined" style={{ width: 65 }}>
                            Sửa
                        </Button>
                    </Link>
                    <Button color="danger" variant="outlined" style={{ width: 65 }}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table 
            dataSource={data.products}
            columns={columns}
            rowKey="_id"
            className="overflow-hidden rounded-2xl border border-gray-200"
            rowSelection={{ type: "checkbox"}}
            scroll={{x:1000}}
            pagination={{
                position: ["bottomCenter"],
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
    )
};

export default ProductTable;
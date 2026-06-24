import { Button, Image, Input, Space, Switch, Table } from "antd";
import type { Product } from "../types/products.type";
import { Link } from "react-router-dom";

type Props = {
    products: Product[];
};

const ProductTable = ({ products }: Props) => {
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
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                    onChange={(checked) => {
                        console.log(record.id, checked);
                        // gọi API update status ở đây
                    }}
                />
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Product) => (
                <Space>
                    <Link to={`/admin/products/details/${record.id}`}>
                        <Button color="default" variant="outlined" style={{ width: 65 }}>
                            Chi tiết
                        </Button>
                    </Link>
                    <Link to={`/admin/products/edit/${record.id}`}>
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
            dataSource={products}
            columns={columns}
            rowKey="id"
            pagination={{position: ["bottomCenter"]}} 
            className="overflow-hidden rounded-2xl border border-gray-200"
            rowSelection={{ type: "checkbox"}}
            scroll={{x:1000}}
        />
    )
};

export default ProductTable;
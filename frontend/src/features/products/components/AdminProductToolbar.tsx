
import {
    DeleteOutlined,
    PlusOutlined,
    EditOutlined
} from "@ant-design/icons";
import { Card, Select, Input, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import type { Product,  ProductQuery } from "../types/products.type";
import { useState} from "react";
import { useAdminUpdateProduct } from "../hooks/useAdminUpdateProduct";
import { useAdminDeleteProduct } from "../hooks/useAdminDeleteProduct";

const { Search } = Input;

type Props = {
    query: ProductQuery,
    updateQuery: (values: Partial<ProductQuery>) => void,
    selectedRows: Product[],
    refetch: () => Promise<void>,
}

const AdminProductToolbar = ({query, updateQuery, selectedRows, refetch}: Props) => {
    const [keyword, setKeyword] = useState(query.search || "");

    const {updateProduct} = useAdminUpdateProduct();
    const {deleteProduct} = useAdminDeleteProduct();
    const [action, setAction] = useState<string>();
    
    const handleApply = async () => {
        if (!action) return;
        if (action === "active") {
            await Promise.all(
                selectedRows.map(product =>
                    updateProduct({ status: "active" }, String(product._id))
                )
            );
            message.success("Cập nhật trạng thái hoạt động thành công!")
        }
        if (action === "inactive") {
            await Promise.all(
                selectedRows.map(product =>
                    updateProduct({ status: "inactive" }, String(product._id))
                )
            );
            message.success("Cập nhật trạng thái dừng hoạt động thành công!")
        }
        if (action === "delete") {
            // gọi API delete bulk hoặc từng item
            await Promise.all(
                selectedRows.map(product =>
                    deleteProduct(String(product._id))
                )
            );
            message.success("Xóa sản phẩm thành công!")
        }
        setAction(undefined);
        await refetch();
    }
    return (
        <Card
            variant="borderless"
            className="rounded-2xl shadow-sm"
            styles={{body: { padding: 16 }}}
        >
            <div className="flex flex-col xl:flex-row xl:items-center overflow-hidden rounded-2xl">
                <div className="flex items-center gap-3 border-b xl:border-b-0 xl:border-r border-gray-200 px-4 py-4">
                    <div className="flex items-center gap-2 whitespace-nowrap max-sm:hidden">
                        <EditOutlined className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                            Bulk actions
                        </span>
                    </div>
                    <Select
                        size="large"
                        className="min-w-[190px]"
                        placeholder="Select action"
                        value={action}
                        onChange={(value) => setAction(value)}
                        options={[
                            { value: "active", label: "Active" },
                            { value: "inactive", label: "Inactive" },
                            { value: "delete", label: "Delete" }
                        ]}
                    />
                    {action === "delete" ? (
                        <Popconfirm
                            title="Xóa sản phẩm"
                            description={`Bạn có chắc muốn xóa ${selectedRows.length} sản phẩm?`}
                            okText="Xóa"
                            cancelText="Hủy"
                            okButtonProps={{ danger: true }}
                            onConfirm={handleApply}
                        >
                            <Button
                                danger
                                ghost
                                size="large"
                                className="min-w-[90px]"
                                disabled={selectedRows.length === 0}
                            >
                                Apply
                            </Button>
                        </Popconfirm>
                    ) : (
                        <Button
                            size="large"
                            className="min-w-[90px]"
                            disabled={!action || selectedRows.length === 0}
                            onClick={handleApply}
                        >
                            Apply
                        </Button>
                    )}
                </div>
                <div className="flex-1 border-b xl:border-b-0 xl:border-r border-gray-200 p-4">
                    <Search
                        placeholder="Search products..."
                        allowClear
                        size="large"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onSearch={(value) => updateQuery({search: value, page:1})}
                    />
                </div>
                <div className="flex items-center gap-2 p-4">
                    <Link to="/admin/products/recycle-bin">
                        <Button
                            icon={<DeleteOutlined />}
                            size="large"
                            danger
                        >
                            Trash
                        </Button>
                    </Link>
                    <Link to="/admin/products/create">
                        <Button
                            size="large"
                            icon={<PlusOutlined />}
                            className="
                                !border-green-500
                                !text-green-600
                                hover:!border-green-500
                                hover:!text-green-600
                                hover:!bg-green-50
                            "
                        >
                            New Product
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default AdminProductToolbar;
import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Select, Input, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import type {  ProductListItem,  ProductQuery } from "../types/products.type";
import { useState} from "react";
import { useAdminUpdateProduct } from "../hooks/useAdminUpdateProduct";
import { useAdminDeleteProduct } from "../hooks/useAdminDeleteProduct";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { usePermission } from "../../auth/hooks/usePermission";
import { PERMISSIONS } from "../../roles/constants/role.const";

const { Search } = Input;

type Props = {
    query: ProductQuery,
    updateQuery: (values: Partial<ProductQuery>) => void,
    selectedRows: ProductListItem[],
    refetch: () => Promise<void>,
}

const AdminProductToolbar = ({query, updateQuery, selectedRows, refetch}: Props) => {
    const [keyword, setKeyword] = useState(query.search || "");

    const {updateProduct} = useAdminUpdateProduct();
    const {deleteProduct} = useAdminDeleteProduct();
    const [action, setAction] = useState<string>();

    const can = usePermission();
    const canCreate = can(PERMISSIONS.PRODUCTS.CREATE);
    const canUpdate = can(PERMISSIONS.PRODUCTS.UPDATE);
    const canDelete = can(PERMISSIONS.PRODUCTS.DELETE);
    const bulkOptions = [
        canUpdate && { value: "active", label: "Active" },
        canUpdate && { value: "inactive", label: "Inactive" },
        canDelete && { value: "delete", label: "Delete" },
    ].filter(Boolean) as { value: string; label: string }[];

    const showBulkActions = canUpdate || canDelete;
    const showRightActions = canCreate || canUpdate;
    
    const handleApply = async () => {
        if (!action) return;
        try{
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
        }catch(error){
            message.error(getErrorMessage(error));
        }
    }
    return (
        <Card
            variant="borderless"
            className="rounded-2xl shadow-sm"
            styles={{body: { padding: 16 }}}
        >
            <div className="flex flex-col xl:flex-row xl:items-center overflow-hidden rounded-2xl">
                {showBulkActions && (
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
                            options={bulkOptions}
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
                                    disabled={selectedRows.length === 0 && can(PERMISSIONS.PRODUCTS.UPDATE)}
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
                )}
                <div className={`flex-1 border-b xl:border-b-0 border-gray-200 p-4`}>
                    <Search
                        placeholder="Search products..."
                        allowClear
                        size="large"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onSearch={(value) => updateQuery({search: value, page:1})}
                    />
                </div>
                {showRightActions && (
                    <div className="flex items-center gap-2 p-4 xl:border-l border-gray-200">
                        {canUpdate && (
                            <Link to="/admin/recycle-bin/products">
                                <Button
                                    icon={<DeleteOutlined />}
                                    size="large"
                                    danger
                                >
                                    Trash
                                </Button>
                            </Link>
                        )}
                        {canCreate && (
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
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default AdminProductToolbar;
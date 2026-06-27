
import {
    DeleteOutlined,
    PlusOutlined,
    EditOutlined
} from "@ant-design/icons";
import { Card, Select, Input, Button } from "antd";
import { Link } from "react-router-dom";
import type { ProductQuery } from "../types/products.type";
import { useState } from "react";

const { Search } = Input;

type Props = {
    query: ProductQuery,
    updateQuery: (values: Partial<ProductQuery>) => void
}

const AdminProductToolbar = ({query, updateQuery}: Props) => {
    const [keyword, setKeyword] = useState(query.search || "");
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
                        options={[
                            { value: "active", label: "Active" },
                            { value: "inactive", label: "Inactive" },
                            { value: "position", label: "Change position" },
                            { value: "delete", label: "Delete" }
                        ]}
                    />
                    <Button
                        size="large"
                        className="min-w-[90px]"
                    >
                        Apply
                    </Button>
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
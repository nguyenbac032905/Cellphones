import { DeleteOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePermission } from "../../auth/hooks/usePermission";
import { PERMISSIONS } from "../../roles/constants/role.const";
import type { ProductCategoryQuery } from "../types/categories.type";
const { Search } = Input;

type Props = {
    query: ProductCategoryQuery;
    updateQuery: (values: Partial<ProductCategoryQuery>) => void;
};

const CategoryToolbarAdmin = ({ query, updateQuery }: Props) => {
    const [keyword, setKeyword] = useState(query.search || "");

    const can = usePermission();
    const canCreate = can(PERMISSIONS.CATEGORIES.CREATE);
    const canUpdate = can(PERMISSIONS.CATEGORIES.UPDATE);

    return (
        <Card
            variant="borderless"
            className="rounded-2xl shadow-sm"
            styles={{ body: { padding: 16 } }}
        >
            <div className="grid grid-cols-4 rounded-2xl">
                <div className="sm:col-span-3 col-span-2 p-4 flex gap-x-3">
                    <Search
                        placeholder="Search categories..."
                        allowClear
                        size="large"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onSearch={(value) =>
                            updateQuery({
                                search: value,
                                page: 1,
                            })
                        }
                    />
                    <button
                        onClick={() =>
                            updateQuery({
                                status: "",
                                category: "",
                                sort: "",
                                search: "",
                                page: 1,
                            })
                        }
                        className="flex items-center justify-center gap-2 border-l border-gray-200 text-red-500 transition hover:bg-red-50"
                    >
                        <ReloadOutlined />
                        <span className="hidden xl:block">Reset</span>
                    </button>
                </div>
                <div className="sm:col-span-1 col-span-2 flex items-center gap-2 p-4 border-l border-gray-200">
                    {canUpdate && (
                        <Link to="/admin/recycle-bin/product-categories">
                            <Button
                                icon={<DeleteOutlined />}
                                size="large"
                                danger
                            >
                                <span className="max-2xl:hidden">Trash</span>
                            </Button>
                        </Link>
                    )}

                    {canCreate && (
                        <Link to="/admin/product-categories/create">
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
                                <span className="max-2xl:hidden">New Category</span>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default CategoryToolbarAdmin;
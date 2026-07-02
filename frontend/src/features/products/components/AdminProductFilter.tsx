import {
    FilterOutlined,
    ReloadOutlined,
    SwapOutlined
} from "@ant-design/icons";
import { Card, Select, TreeSelect } from "antd";
import type { ProductQuery } from "../types/products.type";
import { useAdminCategoriesTree } from "../../productCategories/hooks/useAdminCategoriesTree";

type Props = {
    query: ProductQuery,
    updateQuery: (values: Partial<ProductQuery>) => void
}

const AdminProductFilter = ({query, updateQuery}: Props) => {
    const {categoriesTree} = useAdminCategoriesTree();
    return (
        <Card
            variant="borderless"
            className="rounded-2xl shadow-sm"
            styles={{body: { padding: 16 }}}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden rounded-2xl">
                <div className="lg:col-span-2 grid grid-cols-3 sm:grid-cols-7 gap-y-2 border-b border-gray-200">
                    <div className="col-span-1 hidden sm:flex items-center justify-center border-r border-gray-200 gap-x-1">
                        <FilterOutlined className="text-xl text-gray-700" />
                        <p className="font-semibold text-gray-800 hidden xl:flex">Filter by</p>
                    </div>
                    <div className="sm:col-span-2 border-r border-gray-200 px-4 py-4 flex items-center justify-center">
                        <Select
                            variant="borderless"
                            className="w-full"
                            value={query.status}
                            placeholder="Filter status"
                            onChange={(value) => updateQuery({status: value, page:1})}
                            options={[
                                { value: "", label: "All Status" },
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                            ]}
                        />
                    </div>
                    <div className="sm:col-span-2 border-r border-gray-200 px-4 py-4 flex items-center justify-center">
                        <TreeSelect
                            value={query.category}
                            variant="borderless"
                            className="w-full"
                            placeholder="Filter category"
                            treeData={categoriesTree}
                            allowClear
                            onChange={(value) => updateQuery({ category: value, page:1 })}
                            treeDefaultExpandedKeys={
                                categoriesTree[0]?._id ? [categoriesTree[0]._id] : []
                            }
                            fieldNames={{
                                label: "title",
                                value: "_id",
                                children: "children"
                            }}
                        />
                    </div>
                    <div className="sm:col-span-2 border-r border-gray-200 px-4 py-4 flex items-center justify-center">
                        <Select
                            variant="borderless"
                            className="w-full"
                            placeholder="Filter stock"
                            value={query.stock}
                            onChange={(value) => updateQuery({stock: value, page:1})}
                            options={[
                                { value: "", label: "All stock" },
                                { value: "instock", label: "In Stock" },
                                { value: "outofstock", label: "Out Of Stock" },
                            ]}
                        />
                    </div>
                </div>
                <div className="col-span-1 px-3 flex items-center">
                    <div className="grid grid-cols-2 sm:grid-cols-6 w-full gap-x-2">
                        <div className="col-span-2 hidden sm:flex items-center justify-center border-r border-gray-200 gap-x-1">
                            <SwapOutlined className="text-xl text-gray-700" />
                            <p className="font-semibold text-gray-800 hidden xl:flex">Sort by</p>
                        </div>
                        <div className="sm:col-span-3 border-r border-gray-200 px-4 py-4">
                            <Select
                                variant="borderless"
                                className="w-full"
                                placeholder="Sort by"
                                value={query.sort}
                                onChange={(value) => updateQuery({sort: value})}
                                options={[
                                    { value: "stock-asc", label: "Stock ↑" },
                                    { value: "stock-desc", label: "Stock ↓" },
                                    { value: "created-desc", label: "Newest" },
                                    { value: "created-asc", label: "Oldest" },
                                    { value: "position-asc", label: "Position ↑" },
                                    { value: "position-desc", label: "Position ↓" },
                                    { value: "price-asc", label: "Price ↑" },
                                    { value: "price-desc", label: "Price ↓" },
                                ]}
                            />
                        </div>
                        <button onClick={() => updateQuery({status: "", category: "", stock: "", sort: "", search: ""})} className="col-span-1 flex items-center justify-center gap-2 border-r border-gray-200 text-red-500 transition hover:bg-red-50">
                            <ReloadOutlined />
                            <span className="hidden xl:block">Reset</span>
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AdminProductFilter;
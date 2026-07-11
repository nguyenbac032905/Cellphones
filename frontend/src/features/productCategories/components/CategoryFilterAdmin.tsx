import { FilterOutlined, SwapOutlined } from "@ant-design/icons";
import { Card, Select } from "antd";
import type { CategoryListItem, ProductCategoryQuery } from "../types/categories.type";

type Props = {
    query: ProductCategoryQuery;
    categories: CategoryListItem[];
    updateQuery: (values: Partial<ProductCategoryQuery>) => void;
};

const CategoryFilterAdmin = ({ query, categories, updateQuery, }: Props) => {
    const rootCategories = categories.filter((item) => item.parent_id === null);

    return (
        <Card
            variant="borderless"
            className="rounded-2xl shadow-sm"
            styles={{ body: { padding: 16 } }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden rounded-2xl">
                <div className="lg:col-span-2 grid grid-cols-3 sm:grid-cols-7 gap-y-2">
                    <div className="col-span-1 hidden sm:flex items-center justify-center border-r border-gray-200 gap-x-1">
                        <FilterOutlined className="text-xl text-gray-700" />
                        <p className="font-semibold text-gray-800 hidden xl:flex">
                            Filter by
                        </p>
                    </div>

                    <div className="sm:col-span-3 border-r border-gray-200 px-4 py-4 flex items-center justify-center">
                        <Select
                            variant="borderless"
                            className="w-full"
                            value={query.status}
                            placeholder="Filter status"
                            onChange={(value) =>
                                updateQuery({ status: value, page: 1 })
                            }
                            options={[
                                { value: "", label: "All Status" },
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                            ]}
                        />
                    </div>

                    <div className="sm:col-span-3 border-r border-gray-200 px-4 py-4 flex items-center justify-center">
                        <Select
                            variant="borderless"
                            className="w-full"
                            allowClear
                            placeholder="Parent category"
                            value={query.category}
                            onChange={(value) =>
                                updateQuery({
                                    category: value ?? "",
                                    page: 1,
                                })
                            }
                            options={[
                                {
                                    value: "",
                                    label: "All Categories",
                                },
                                ...rootCategories.map((item) => ({
                                    value: item._id,
                                    label: item.title,
                                })),
                            ]}
                        />
                    </div>
                </div>

                <div className="col-span-1 px-3 flex items-center">
                    <div className="grid grid-cols-2 sm:grid-cols-6 w-full gap-x-2">
                        <div className="col-span-2 hidden sm:flex items-center justify-center border-r border-gray-200 gap-x-1">
                            <SwapOutlined className="text-xl text-gray-700" />
                            <p className="font-semibold text-gray-800 hidden xl:flex">
                                Sort by
                            </p>
                        </div>

                        <div className="sm:col-span-4 px-4 py-4">
                            <Select
                                variant="borderless"
                                className="w-full"
                                placeholder="Sort by"
                                value={query.sort}
                                onChange={(value) =>
                                    updateQuery({ sort: value })
                                }
                                options={[
                                    {
                                        value: "created-desc",
                                        label: "Newest",
                                    },
                                    {
                                        value: "created-asc",
                                        label: "Oldest",
                                    },
                                    {
                                        value: "position-asc",
                                        label: "Position ↑",
                                    },
                                    {
                                        value: "position-desc",
                                        label: "Position ↓",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CategoryFilterAdmin;
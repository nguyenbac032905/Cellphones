import {
    FilterOutlined,
    ReloadOutlined,
    SwapOutlined
} from "@ant-design/icons";
import { Card, Select } from "antd";


const AdminProductFilter = () => {
    return (
        <Card
            bordered={false}
            className="rounded-2xl shadow-sm"
            bodyStyle={{ padding: 0 }}
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
                            defaultValue=""
                            options={[
                                { value: "", label: "All Status" },
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                            ]}
                        />
                    </div>
                    <div className="sm:col-span-2 border-r border-gray-200 px-4 py-4 flex items-center justify-center">
                        <Select
                            variant="borderless"
                            className="w-full"
                            defaultValue=""
                            options={[
                                { value: "", label: "All category" },
                                { value: "iphone", label: "iPhone" },
                                { value: "oppo", label: "Oppo" },
                            ]}
                        />
                    </div>
                    <div className="sm:col-span-2 border-r border-gray-200 px-4 py-4 flex items-center justify-center">
                        <Select
                            variant="borderless"
                            className="w-full"
                            defaultValue=""
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
                        <button className="col-span-1 flex items-center justify-center gap-2 border-r border-gray-200 text-red-500 transition hover:bg-red-50">
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
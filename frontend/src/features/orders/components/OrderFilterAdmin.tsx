import { FilterOutlined, ReloadOutlined, SwapOutlined, } from "@ant-design/icons";
import { Card, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import type { OrderQuery } from "../types/orderAdmin.type";
const { RangePicker } = DatePicker;

type Props = {
    query: OrderQuery;
    updateQuery: (values: Partial<OrderQuery>) => void;
};

const OrderFilterAdmin = ({ query, updateQuery }: Props) => {
    return (
        <Card
            variant="borderless"
            className="rounded-2xl shadow-sm"
            styles={{ body: { padding: 16 } }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden rounded-2xl">

                {/* FILTER */}
                <div className="lg:col-span-2 grid grid-cols-3 sm:grid-cols-7 gap-y-2">

                    <div className="col-span-1 hidden sm:flex items-center justify-center border-r border-gray-200 gap-x-1">
                        <FilterOutlined className="text-xl text-gray-700" />
                        <p className="font-semibold text-gray-800 hidden xl:flex">
                            Filter by
                        </p>
                    </div>

                    {/* Status */}
                    <div className="sm:col-span-2 border-r border-gray-200 px-4 py-4 flex items-center justify-center">
                        <Select
                            variant="borderless"
                            className="w-full"
                            value={query.orderStatus}
                            placeholder="Order status"
                            onChange={(value) =>
                                updateQuery({
                                    orderStatus: value,
                                    page: "1",
                                })
                            }
                            options={[
                                {
                                    value: "",
                                    label: "All Status",
                                },
                                {
                                    value: "PENDING",
                                    label: "Pending",
                                },
                                {
                                    value: "PROCESSING",
                                    label: "Processing",
                                },
                                {
                                    value: "SHIPPED",
                                    label: "Shipped",
                                },
                                {
                                    value: "DELIVERING",
                                    label: "Delivering",
                                },
                                {
                                    value: "DELIVERED",
                                    label: "Delivered",
                                },
                                {
                                    value: "CANCELLED",
                                    label: "Cancelled",
                                },
                                {
                                    value: "RETURNED",
                                    label: "Returned",
                                },
                            ]}
                        />
                    </div>

                    {/* Order Date */}
                    <div className="sm:col-span-4 px-4 py-4">
                        <RangePicker
                            className="w-full"
                            value={
                                query.fromDate && query.toDate
                                    ? [
                                          dayjs(query.fromDate),
                                          dayjs(query.toDate),
                                      ]
                                    : null
                            }
                            onChange={(dates) =>
                                updateQuery({
                                    page: "1",
                                    fromDate: dates?.[0]
                                        ?.startOf("day")
                                        .toISOString(),
                                    toDate: dates?.[1]
                                        ?.endOf("day")
                                        .toISOString(),
                                })
                            }
                        />
                    </div>
                </div>

                {/* SORT */}
                <div className="col-span-1 px-3 flex items-center">
                    <div className="grid grid-cols-2 sm:grid-cols-6 w-full gap-x-2">

                        <div className="col-span-2 hidden sm:flex items-center justify-center border-r border-gray-200 gap-x-1">
                            <SwapOutlined className="text-xl text-gray-700" />
                            <p className="font-semibold text-gray-800 hidden xl:flex">
                                Sort by
                            </p>
                        </div>

                        <div className="sm:col-span-3 border-r border-gray-200 px-4 py-4">
                            <Select
                                variant="borderless"
                                className="w-full"
                                placeholder="Sort by"
                                value={query.sort}
                                onChange={(value) =>
                                    updateQuery({
                                        sort: value,
                                    })
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
                                        value: "price-desc",
                                        label: "Highest Price",
                                    },
                                    {
                                        value: "price-asc",
                                        label: "Lowest Price",
                                    },
                                ]}
                            />
                        </div>

                        <button
                            onClick={() =>
                                updateQuery({
                                    page: "1",
                                    orderStatus: "",
                                    fromDate: "",
                                    toDate: "",
                                    sort: "",
                                })
                            }
                            className="col-span-1 flex items-center justify-center gap-2 border-r border-gray-200 text-red-500 transition hover:bg-red-50"
                        >
                            <ReloadOutlined />
                            <span className="hidden xl:block">
                                Reset
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default OrderFilterAdmin;
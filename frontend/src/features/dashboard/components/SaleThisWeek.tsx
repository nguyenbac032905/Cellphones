import { useState } from "react";
import { Select } from "antd";
import SaleChart from "./SaleChart";
import type { SaleQuery } from "../types/dashboard.type";
import { useSale } from "../hooks/useSale";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";

const SaleThisWeek = () => {
    const [query, setQuery] = useState<SaleQuery>({ type: "week" });
    const {revenueData,loading, error} = useSale(query);
    console.log(revenueData)
    const handleChange = (value: SaleQuery["type"]) => {
        const newQuery: SaleQuery = { type: value };
        setQuery(newQuery);
    };
    if(loading){
        return <LoadingScreen />
    }
    if(error || !revenueData) {
        return <CustomAlert error="Something went wrong!"/>
    }
    const totalRevenueThisWeek = revenueData?.series?.[0]?.data?.reduce((sum, item) => sum + item, 0) ?? 0;
    return (
        <div className="xl:p-8 sm:p-6 p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <span className="text-3xl font-bold">{totalRevenueThisWeek.toLocaleString("vi-VN")}đ</span>
                    <h3 className="text-gray-600">Sales Overview</h3>
                </div>

                <Select
                    value={query.type}
                    onChange={handleChange}
                    className="w-36"
                    options={[
                        {
                            label: "This week",
                            value: "week",
                        },
                        {
                            label: "This month",
                            value: "month",
                        },
                        {
                            label: "This year",
                            value: "year",
                        },
                    ]}
                />
            </div>
            <SaleChart revenueData={revenueData}/>
        </div>
    );
};

export default SaleThisWeek;
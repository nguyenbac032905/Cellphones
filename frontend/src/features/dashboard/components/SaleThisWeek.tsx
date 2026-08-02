import Datepicker from "./DatePicker";
import SaleChart from "./SaleChart";
import {RiseOutlined} from "@ant-design/icons";

const SaleThisWeek = () => {
    return (
        <>
            <div className="xl:p-8 sm:p-6 p-4 bg-white rounded-lg shadow ">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <span className="text-3xl font-bold">$45,385</span>
                        <h3 className="text-gray-600">Sales this week</h3>
                    </div>
                    <div className="flex flex-1 items-center justify-end text-green-600 font-bold">
                        <Datepicker />
                    </div>
                </div>
                <SaleChart />
            </div>
        </>
    )
}
export default SaleThisWeek;
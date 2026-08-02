import VisitorsChart from "./VisitorsChart";
import {RiseOutlined} from "@ant-design/icons";

const VisitorsThisWeek = () => {
    return (
        <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
            <div className="flex items-center">
                <div className="shrink-0">
                    <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
                        5,355
                    </span>
                    <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
                        Visitors this week
                    </h3>
                </div>
                <div className="ml-5 flex w-0 flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
                    32.9%
                    <RiseOutlined className="text-xs" />
                </div>
            </div>
            <VisitorsChart />
        </div>
    )
}
export default VisitorsThisWeek;
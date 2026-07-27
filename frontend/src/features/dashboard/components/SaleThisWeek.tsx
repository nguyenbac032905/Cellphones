import Datepicker from "./DatePicker";
import SaleChart from "./SaleChart";

const SaleThisWeek = () => {
    return (
        <>
            <div className="xl:p-8 sm:p-6 p-4 bg-white rounded-lg shadow ">
                <div className="flex justify-between items-center mb-4">
                    <div className="shrink-0">
                        <span className="text-3xl font-bold">$45,385</span>
                        <h3 className="text-gray-600 mt-1">Sales this week</h3>
                    </div>
                    <div className="flex flex-1 items-center justify-end text-green-600 font-bold">
                        <span>12.5%</span>
                        <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <SaleChart />
                <div className="flex justify-between items-center mt-5 border-t border-gray-200 pt-3 sm:pt-6">
                    <Datepicker />
                    <div className="shrink-0">
                        <a href="#" className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm">
                            Sale Report
                            <svg
                                className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SaleThisWeek;
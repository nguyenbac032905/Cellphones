import { ClockCircleOutlined, SyncOutlined, CarOutlined, CheckCircleOutlined, CloseCircleOutlined, } from "@ant-design/icons";
import { useOrderPipeline } from "../hooks/useOrderPipeline";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";

interface PipelineStep {
    title: string;
    count: number;
    description: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
}

const OrderPipeline = () => {
    const {pipeline, loading, error} = useOrderPipeline();
    if(loading){
        return <LoadingScreen />
    }
    if(error){
        return <CustomAlert error={error} />
    }
    const pipelineData: PipelineStep[] = pipeline.map((item) => {
        switch (item.title) {
            case "Pending":
                return {
                    ...item,
                    icon: <ClockCircleOutlined />,
                    iconBg: "bg-amber-100/60",
                    iconColor: "text-amber-600",
                };
            case "Processing":
                return {
                    ...item,
                    icon: <SyncOutlined />,
                    iconBg: "bg-sky-100/60",
                    iconColor: "text-sky-500",
                };
            case "On Delivery":
                return {
                    ...item,
                    icon: <CarOutlined />,
                    iconBg: "bg-indigo-100/60",
                    iconColor: "text-indigo-600",
                };
            case "Completed":
                return {
                    ...item,
                    icon: <CheckCircleOutlined />,
                    iconBg: "bg-emerald-100/60",
                    iconColor: "text-emerald-600",
                };
            case "Cancelled":
                return {
                    ...item,
                    icon: <CloseCircleOutlined />,
                    iconBg: "bg-rose-100/60",
                    iconColor: "text-rose-500",
                };
            default:
                return {
                    ...item,
                    icon: <ClockCircleOutlined />,
                    iconBg: "bg-gray-100",
                    iconColor: "text-gray-500",
                };
        }
    });
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pipelineData.map((item, index) => (
                <div
                    key={index}
                    className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm flex flex-col justify-between"
                >
                    <div className="flex items-start justify-between">
                        <span className="text-xs font-semibold text-slate-400">
                            {item.title}
                        </span>
                        <div
                            className={`w-9 h-9 rounded-2xl flex items-center justify-center text-base ${item.iconBg} ${item.iconColor}`}
                        >
                            {item.icon}
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 my-1">
                        {item.count}
                    </div>
                    <div className="text-xs text-slate-400 font-normal truncate">
                        {item.description}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderPipeline;
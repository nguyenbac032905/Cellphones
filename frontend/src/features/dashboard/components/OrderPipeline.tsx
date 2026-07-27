import { ClockCircleOutlined, SyncOutlined, CarOutlined, CheckCircleOutlined, CloseCircleOutlined, } from "@ant-design/icons";

interface PipelineStep {
    title: string;
    count: number;
    description: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
}

const pipelineData: PipelineStep[] = [
    {
        title: "Pending",
        count: 12,
        description: "Awaiting confirmation",
        icon: <ClockCircleOutlined />,
        iconBg: "bg-amber-100/60",
        iconColor: "text-amber-600",
    },
    {
        title: "Processing",
        count: 28,
        description: "Packing & Preparing",
        icon: <SyncOutlined />,
        iconBg: "bg-sky-100/60",
        iconColor: "text-sky-500",
    },
    {
        title: "On Delivery",
        count: 45,
        description: "Shipping in progress",
        icon: <CarOutlined />,
        iconBg: "bg-indigo-100/60",
        iconColor: "text-indigo-600",
    },
    {
        title: "Completed",
        count: 180,
        description: "Delivered successfully",
        icon: <CheckCircleOutlined />,
        iconBg: "bg-emerald-100/60",
        iconColor: "text-emerald-600",
    },
    {
        title: "Cancelled",
        count: 3,
        description: "Refunded / Cancelled",
        icon: <CloseCircleOutlined />,
        iconBg: "bg-rose-100/60",
        iconColor: "text-rose-500",
    },
];

const OrderPipeline = () => {
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
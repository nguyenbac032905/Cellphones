import { DollarOutlined, UserOutlined, ShoppingCartOutlined, EyeOutlined, RiseOutlined, FallOutlined, } from "@ant-design/icons";

interface StatItem {
    title: string;
    value: string;
    change: string;
    isIncrease: boolean;
    timeframe: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
}

const statsData: StatItem[] = [
    {
        title: "Total Revenue",
        value: "$48,295",
        change: "+12.5%",
        isIncrease: true,
        timeframe: "vs last month",
        icon: <DollarOutlined />,
        iconBg: "bg-emerald-100/60",
        iconColor: "text-emerald-600",
    },
    {
        title: "Active Users",
        value: "2,847",
        change: "+8.2%",
        isIncrease: true,
        timeframe: "vs last month",
        icon: <UserOutlined />,
        iconBg: "bg-teal-100/60",
        iconColor: "text-teal-600",
    },
    {
        title: "Total Orders",
        value: "1,432",
        change: "-3.1%",
        isIncrease: false,
        timeframe: "vs last month",
        icon: <ShoppingCartOutlined />,
        iconBg: "bg-sky-100/60",
        iconColor: "text-sky-500",
    },
    {
        title: "Page Views",
        value: "284K",
        change: "+24.7%",
        isIncrease: true,
        timeframe: "vs last month",
        icon: <EyeOutlined />,
        iconBg: "bg-amber-100/60",
        iconColor: "text-amber-500",
    },
];

const DashboardStats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((item, index) => (
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
                        {item.value}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                        <span
                            className={`flex items-center gap-1 font-bold ${item.isIncrease ? "text-emerald-500" : "text-rose-500"
                                }`}
                        >
                            {item.isIncrease ? (
                                <RiseOutlined className="text-xs" />
                            ) : (
                                <FallOutlined className="text-xs" />
                            )}
                            {item.change}
                        </span>
                        <span className="text-slate-400 font-normal">{item.timeframe}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
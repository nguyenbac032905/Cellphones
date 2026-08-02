import { DollarOutlined, UserOutlined, ShoppingCartOutlined, InboxOutlined , RiseOutlined, FallOutlined, } from "@ant-design/icons";
import { useStats } from "../hooks/useStats";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";

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

const DashboardStats = () => {
    const {stats, loading, error} = useStats();
    if(loading) {
        return <LoadingScreen />;
    }
    if(stats === null || error){
        return <CustomAlert error="Stats not found"/>
    }
    const statsData = [
        {
            ...stats.totalRevenue,
            value: `${(Math.round(stats.totalRevenue.value)).toLocaleString("vi-VN")} đ`,
            icon: <DollarOutlined />,
            iconBg: "bg-emerald-100/60",
            iconColor: "text-emerald-600",
        },
        {
            ...stats.totalOrders,
            icon: <ShoppingCartOutlined />,
            iconBg: "bg-sky-100/60",
            iconColor: "text-sky-500",
        },
        {
            ...stats.totalProductsSold,
            icon: <InboxOutlined  />,
            iconBg: "bg-amber-100/60",
            iconColor: "text-amber-500",
        },
        {
            ...stats.totalNewUsers,
            icon: <UserOutlined />,
            iconBg: "bg-teal-100/60",
            iconColor: "text-teal-600",
        },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((item, index) => (
                <div
                    key={index}
                    className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm flex flex-col justify-between"
                >
                    <div className="flex items-start justify-between">
                        <span className="text-xs font-semibold text-neutral-800">
                            {item.title}
                        </span>
                        <div
                            className={`w-13 h-13 rounded-2xl flex items-center justify-center text-base ${item.iconBg} ${item.iconColor}`}
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
                            {item.change} %
                        </span>
                        <span className="text-slate-400 font-normal">{item.timeframe}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
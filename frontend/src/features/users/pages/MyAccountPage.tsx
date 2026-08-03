import { GiftOutlined, LogoutOutlined, ShoppingOutlined, UserOutlined, } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const MyAccountPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        {
            label: "Thông tin tài khoản",
            icon: UserOutlined,
            path: "/my-account",
            exact: true,
        },
        {
            label: "Đơn hàng của tôi",
            icon: ShoppingOutlined,
            path: "/my-account/orders",
        },
        {
            label: "Ưu đãi của tôi",
            icon: GiftOutlined,
            path: "/my-account/vouchers",
        },
    ];

    return (
        <div className="flex gap-5 my-5">
            <div className="w-64 rounded-2xl border border-neutral-200 bg-white py-4 shadow-sm">
                <div className="space-y-1">
                    {menus.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden px-4 py-3 text-sm font-medium transition-all duration-200
                                        ${isActive ? "bg-red-50 text-primary-500 shadow-sm"
                                        : "text-neutral-700 hover:bg-red-50 hover:text-primary-500"
                                    }`}
                            >
                                <span
                                    className={`absolute left-0 top-0 h-full w-1 rounded-r-full transition-all duration-300
                                            ${isActive ? "bg-primary-500 opacity-100"
                                            : "bg-primary-500 opacity-0 group-hover:opacity-100"
                                        }`}
                                />
                                <Icon
                                    className={`text-lg transition-colors
                                            ${isActive ? "text-primary-500"
                                            : "text-neutral-500 group-hover:text-primary-500"
                                        }`}
                                />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}

                    <div className="my-3 border-t border-neutral-100" />
                    <button
                        onClick={() => console.log("logout")}
                        className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-all hover:bg-red-50"
                    >
                        <LogoutOutlined className="text-lg transition-transform group-hover:-translate-x-0.5" />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </div>
            <div className="flex-1 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <Outlet />
            </div>
        </div>
    );
};

export default MyAccountPage;
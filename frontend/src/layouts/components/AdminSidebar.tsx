import {
    DashboardOutlined,
    AppstoreOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    SettingOutlined,
    SafetyCertificateOutlined,
    TeamOutlined,
    KeyOutlined,
} from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from 'antd';
import type { Dispatch, SetStateAction } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePermission } from "../../features/auth/hooks/usePermission";
import { PERMISSIONS } from "../../features/roles/constants/role.const";
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
type AdminHeaderProps = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const AdminSidebar = ({ collapsed, setCollapsed }: AdminHeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const can = usePermission();

    const sidebarItems: MenuItem[] = [
        {
            key: "/admin",
            icon: <DashboardOutlined />,
            label: "Dashboard",
        },
        {
            type: "divider",
        },
        {
            type: "group",
            label: "MANAGEMENT",
            children: [
                can(PERMISSIONS.PRODUCTS.READ) ? 
                {
                    key: "/admin/products",
                    icon: <ShoppingOutlined />,
                    label: "Products",
                }: null,
                can(PERMISSIONS.CATEGORIES.READ) ? 
                {
                    key: "/admin/product-categories",
                    icon: <AppstoreOutlined />,
                    label: "Categories",
                }: null,
                can(PERMISSIONS.USERS.READ) ? 
                {
                    key: "/admin/users",
                    icon: <UserOutlined />,
                    label: "Users",
                }: null,
                can(PERMISSIONS.ROLES.READ) ? 
                {
                    key: "/admin/roles",
                    icon: <SafetyCertificateOutlined />,
                    label: "Roles"
                }: null,
                can(PERMISSIONS.ORDERS.READ) ? 
                {
                    key: "/admin/orders",
                    icon: <ShoppingCartOutlined />,
                    label: "Orders",
                }: null,
            ],
        },
        {
            type: "divider",
        },
        {
            type: "group",
            label: "SYSTEM",
            children: [
                {
                    key: "/admin/settings",
                    icon: <SettingOutlined />,
                    label: "Settings",
                },
            ],
        },
    ];
    return (
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed} breakpoint="md" onBreakpoint={(broken) => setCollapsed(broken)}>
            <div className="h-16 flex items-center justify-center border-b border-gray-100">
                <Link to="/admin">
                    <img
                        src="/Logo.png"
                        alt="logo"
                        className="
                            object-contain
                            transition-all
                            duration-300
                        "
                        width={collapsed ? 40 : 120}
                    />
                </Link>
            </div>
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                onClick={({ key }: { key: string }) => {navigate(key)}}
                items={sidebarItems}
            />
        </Sider>
    )
}
export default AdminSidebar;
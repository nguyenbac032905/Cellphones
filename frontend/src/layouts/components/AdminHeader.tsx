import { BellFilled, DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined, } from '@ant-design/icons';
import { Badge, Button, Input, Layout, theme, Dropdown, message } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import type { MenuProps } from 'antd';
import { useAdminLogout } from '../../features/auth/hooks/useAdminLogout';
import { getErrorMessage } from '../../shared/utils/errorHandler';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { titleCase } from '../../shared/utils/titleCase';

const { Header } = Layout;
const { Search } = Input;

type AdminHeaderProps = {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const AdminHeader = ({ collapsed, setCollapsed }: AdminHeaderProps) => {
    const { token: { colorBgContainer }, } = theme.useToken();
    const { loading, logout } = useAdminLogout();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const DEFAULT_AVATAR = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePQrmECqQyT4U2vF38XPiBEyF95GRpEgoTriZ3laX_7ce0_An2KeSQlE&s=10";
    
    const items: MenuProps['items'] = [
        {
            key: 'myAccount',
            label: 'My Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'profile',
            label: 'Profile',
            icon: <UserOutlined />
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            danger: true,
            disabled: loading
        }
    ];
    const handleMenuClick: MenuProps["onClick"] = async (e) => {
        if (e.key === "profile") {
            navigate("/admin/my-account");
            return;
        }
        if (e.key === "logout") {
            try {
                const resLogout = await logout();
                if (resLogout.success) {
                    navigate("/admin/login", { replace: true });
                    message.success(resLogout.message);
                }
            } catch (error) {
                message.error(getErrorMessage(error));
            }
        }
    }
    return (
        <Header style={{ paddingLeft: 0, background: colorBgContainer, lineHeight: "normal", }}>
            <div className="grid grid-cols-9 items-center gap-x-10">
                <Button
                    className='col-span-1'
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <div className='col-span-4 max-sm:ml-2'><Search placeholder="Tìm kiếm..." /></div>
                <div className="col-span-4 flex items-center justify-end gap-2">
                    <div className="relative cursor-pointer p-2">
                        <Badge count={6} size="small">
                            <BellFilled className="text-xl !text-[#1677ff]" />
                        </Badge>
                    </div>
                    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
                        <div className="flex items-center gap-3 rounded-full px-3 py-2 transition-colors hover:bg-gray-100 cursor-pointer">
                            <div className="w-10 h-10 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100">
                                <img
                                    src={user?.avatar || DEFAULT_AVATAR}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = DEFAULT_AVATAR;
                                    }}
                                />
                            </div>
                            <div className="hidden min-w-0 lg:block">
                                <p className="truncate text-sm font-semibold text-gray-800">
                                    {titleCase(user?.fullName ?? "")}
                                </p>
                                <p className="truncate text-xs text-gray-500">
                                    {titleCase(user?.accountType ?? "")}
                                </p>
                            </div>
                            <DownOutlined className="text-xs text-gray-400" />
                        </div>
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}
export default AdminHeader;
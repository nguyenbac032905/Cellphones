import {
    BellFilled,
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Badge, Button, Input, Layout, theme, Dropdown, message} from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import type { MenuProps } from 'antd';
import { useAdminLogout } from '../../features/auth/hooks/useAdminLogout';
import { getErrorMessage } from '../../shared/utils/errorHandler';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Search } = Input;

type AdminHeaderProps = {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const AdminHeader = ({ collapsed, setCollapsed }: AdminHeaderProps) => {
    const { token: { colorBgContainer }, } = theme.useToken();
    const {loading, logout} = useAdminLogout();
    const navigate = useNavigate();

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
        if(e.key === "profile"){
            console.log("Link to profile");
            return;
        }
        if(e.key === "logout"){
            try {
                const resLogout = await logout(); 
                if(resLogout.success){
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
                    <Dropdown menu={{items, onClick: handleMenuClick}} trigger={["click"]}>
                        <div className="flex items-center gap-3 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-100">
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
                                <img
                                    src="../../../public/avatar.jpg"
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="leading-tight hidden lg:block">
                                <p className="font-semibold text-gray-800 text-sm">
                                    Nguyễn Văn Bắc
                                </p>
                                <p className="text-xs text-gray-500">
                                    Admin
                                </p>
                            </div>
                            <DownOutlined className="text-xs text-gray-500" />
                        </div>
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}
export default AdminHeader;
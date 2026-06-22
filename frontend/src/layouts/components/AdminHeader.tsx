import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Input, Layout, theme } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

const { Header} = Layout;
const {Search} = Input;

type AdminHeaderProps = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const AdminHeader = ({collapsed, setCollapsed}: AdminHeaderProps) => {
    const { token: { colorBgContainer}, } = theme.useToken();
    return(
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
                <div className='col-span-4'><Search placeholder="Tìm kiếm..."/></div>
                <div className='col-span-4 flex'>
                    <span>Notify</span>
                    <div className='flex'>
                        <span>avatar</span>
                        <span>name</span>
                    </div>
                </div>
            </div>
        </Header>
)
}
export default AdminHeader;
import { Outlet } from "react-router-dom";
import{ useState } from 'react';
import { Layout } from 'antd';
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
const { Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: "100vh"}}>
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <Layout>
                <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        paddingTop:10,
                        minHeight: 280
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
export default AdminLayout;
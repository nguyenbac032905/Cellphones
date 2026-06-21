import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return(
        <div className="flex min-h-screen">
            <aside className="w-64 bg-black text-white p-5">Sidebar</aside>
            <div className="flex-1">
                <header className="bg-gray-100 p-4 border-b">Admin header</header>
            </div>
            <main className="p-5">
                <Outlet />
            </main>
        </div>
    )
}
export default AdminLayout;
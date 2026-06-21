import { dashboardRoutes } from "./features/dashboard/dashboard.route";
import { homeRoutes } from "./features/home/home.route";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import NotFoundPage from "./shared/pages/NotFoundPage";

export const routes = [
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [...dashboardRoutes]
    },
    {
        path: "/",
        element: <ClientLayout />,
        children: [...homeRoutes]
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];
import { dashboardRoutes } from "./features/dashboard/dashboard.route";
import { homeRoutes } from "./features/home/home.route";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import NotFoundPage from "./shared/pages/NotFoundPage";
import { adminProductRoutes,productRoutes } from "./features/products/product.route";

export const routes = [
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [...dashboardRoutes,...adminProductRoutes]
    },
    {
        path: "/",
        element: <ClientLayout />,
        children: [...homeRoutes,...productRoutes]
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];
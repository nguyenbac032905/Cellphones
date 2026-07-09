import { dashboardRoutes } from "./features/dashboard/dashboard.route";
import { homeRoutes } from "./features/home/home.route";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import NotFoundPage from "./shared/pages/NotFoundPage";
import { adminProductRoutes,productRoutes } from "./features/products/product.route";
import { adminRecycleBinRoutes } from "./features/recycleBin/recycleBin.route";
import { adminAuthRoutes } from "./features/auth/auth.route";
import AdminPrivateRoute from "./features/auth/components/AdminPrivateRoute";
import { adminRoleRoutes } from "./features/roles/role.route";
import ForbiddenPage from "./shared/pages/ForbiddenPage";
import { usersAdminRoutes } from "./features/users/user.route";

export const routes = [
    {
        path: "/admin",
        children: [...adminAuthRoutes]
    },
    {
        path: "/admin",
        element: <AdminPrivateRoute />,
        children: [
            {
                element: <AdminLayout />,
                children: [...dashboardRoutes,...adminProductRoutes,...adminRecycleBinRoutes,...adminRoleRoutes,...usersAdminRoutes]
            }
        ]
    },
    {
        path: "/",
        element: <ClientLayout />,
        children: [...homeRoutes,...productRoutes]
    },
    {
        path: "/403",
        element: <ForbiddenPage/>
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];
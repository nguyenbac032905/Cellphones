import { dashboardRoutes } from "./features/dashboard/dashboard.route";
import { homeRoutes } from "./features/home/home.route";
import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import NotFoundPage from "./shared/pages/NotFoundPage";
import { adminProductRoutes,productRoutes } from "./features/products/product.route";
import { adminRecycleBinRoutes } from "./features/recycleBin/recycleBin.route";
import { adminAuthRoutes, authRoutes } from "./features/auth/auth.route";
import AdminPrivateRoute from "./features/auth/components/AdminPrivateRoute";
import { adminRoleRoutes } from "./features/roles/role.route";
import ForbiddenPage from "./shared/pages/ForbiddenPage";
import { usersAdminRoutes } from "./features/users/user.route";
import MyAccountAdminPage from "./features/auth/pages/MyAccountAdminPage";
import { productCategoryAdminRoutes } from "./features/productCategories/productCategory.route";
import ClientPrivateRoute from "./features/auth/components/ClientPrivateRoute";
import { cartRoutes } from "./features/cart/cart.route";
import { checkoutRoutes } from "./features/checkout/checkout.route";

export const routes = [
    {
        path: "/admin",
        children: [
            ...adminAuthRoutes,
            {
                element: <AdminPrivateRoute />,
                children: [
                    {
                        element: <AdminLayout />,
                        children: [
                            ...dashboardRoutes,
                            ...adminProductRoutes,
                            ...adminRecycleBinRoutes,
                            ...adminRoleRoutes,
                            ...usersAdminRoutes,
                            ...productCategoryAdminRoutes,
                            {
                                path: "my-account",
                                element: <MyAccountAdminPage />
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/",
        children: [
            ...authRoutes,
            {
                element: <ClientLayout />,
                children: [
                    {
                        element: <ClientPrivateRoute />,
                        children: [...cartRoutes,...checkoutRoutes]
                    },
                    ...homeRoutes,
                    ...productRoutes
                ]
            }
        ]
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
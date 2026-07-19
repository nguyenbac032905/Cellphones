import PermissionRoute from "../auth/components/PermissionRoute";
import { PERMISSIONS } from "../roles/constants/role.const";
import AdminProductsCreatePage from "./pages/AdminProductsCreatePage";
import AdminProductsDetailPage from "./pages/AdminProductsDetailPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminProductsUpdatePage from "./pages/AdminProductsUpdatePage";
import ProductByCategoryPage from "./pages/ProductByCategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";

export const adminProductRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.PRODUCTS.READ} />,
        children: [
            {
                path: "products",
                element: <AdminProductsPage />
            },
            {
                path: "products/details/:productID",
                element: <AdminProductsDetailPage />
            }
        ]
    },
    {
        element: <PermissionRoute permission={PERMISSIONS.PRODUCTS.CREATE} />,
        children: [
            {
                path: "products/create",
                element: <AdminProductsCreatePage />
            }
        ]
    },
    {
        element: <PermissionRoute permission={PERMISSIONS.PRODUCTS.UPDATE} />,
        children: [
            {
                path: "products/edit/:productID",
                element: <AdminProductsUpdatePage />
            }
        ]
    }
];
export const productRoutes = [
    {
        path: ":categorySlug",
        element: <ProductByCategoryPage />
    },
    {
        path: "detail/:productSlug",
        element: <ProductDetailPage />
    }
];
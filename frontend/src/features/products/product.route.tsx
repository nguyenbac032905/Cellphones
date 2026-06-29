import AdminProductsCreatePage from "./pages/AdminProductsCreatePage";
import AdminProductsDetailPage from "./pages/AdminProductsDetailPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminProductsUpdatePage from "./pages/AdminProductsUpdatePage";
import ProductsPage from "./pages/ProductsPage";

export const adminProductRoutes = [
    {
        path: "products",
        element: <AdminProductsPage />
    },
    {
        path: "products/details/:productID",
        element: <AdminProductsDetailPage />
    },
    {
        path: "products/create",
        element: <AdminProductsCreatePage />
    },
    {
        path: "products/edit/:productID",
        element: <AdminProductsUpdatePage />
    }
];
export const productRoutes = [
    {
        path: "products",
        element: <ProductsPage />
    }
];
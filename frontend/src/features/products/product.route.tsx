import AdminProductsCreatePage from "./pages/AdminProductsCreatePage";
import AdminProductsDetailPage from "./pages/AdminProductsDetailPage";
import AdminProductsPage from "./pages/AdminProductsPage";
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
    }
];
export const productRoutes = [
    {
        path: "products",
        element: <ProductsPage />
    }
];
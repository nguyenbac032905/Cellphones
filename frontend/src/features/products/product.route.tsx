import AdminProductsPage from "./pages/AdminProductsPage";
import ProductsPage from "./pages/ProductsPage";

export const adminProductRoutes = [
    {
        path: "products",
        element: <AdminProductsPage />
    }
];
export const productRoutes = [
    {
        path: "products",
        element: <ProductsPage />
    }
];
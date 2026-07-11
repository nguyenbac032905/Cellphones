import CreateCategoryAdminPage from "./pages/CreateCategoryAdminPage";
import ProductCategoriesAdminPage from "./pages/ProductCategoriesAdminPage";

export const productCategoryAdminRoutes = [
    {
        path: "product-categories",
        element: <ProductCategoriesAdminPage />
    },
    {
        path: "product-categories/create",
        element: <CreateCategoryAdminPage />
    }
];
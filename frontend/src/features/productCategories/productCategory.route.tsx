import CategoryDetailAdminPage from "./pages/CategoryDetailAdminPage";
import CreateCategoryAdminPage from "./pages/CreateCategoryAdminPage";
import ProductCategoriesAdminPage from "./pages/ProductCategoriesAdminPage";
import UpdateCategoryAdminPage from "./pages/UpdateCategoryAdminPage";

export const productCategoryAdminRoutes = [
    {
        path: "product-categories",
        element: <ProductCategoriesAdminPage />
    },
    {
        path: "product-categories/create",
        element: <CreateCategoryAdminPage />
    },
    {
        path: "product-categories/details/:categoryID",
        element: <CategoryDetailAdminPage />
    },
    {
        path: "product-categories/edit/:categoryID",
        element: <UpdateCategoryAdminPage />
    }
];
import ListOrderAdminPage from "./pages/ListOrderAdminPage";
import OrderDetailPage from "./pages/OrderDetailPage";
export const orderAdminRoutes = [
    {
        path: "orders",
        element: <ListOrderAdminPage />
    }
]
export const orderRoutes = [
    {
        path: "my-account/orders/:orderID",
        element: <OrderDetailPage />
    }
]
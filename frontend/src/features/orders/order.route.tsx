import OrderDetailPage from "./pages/OrderDetailPage";

export const orderRoutes = [
    {
        path: "/orders/:orderID",
        element: <OrderDetailPage />
    }
]
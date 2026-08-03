import OrderDetailPage from "./pages/OrderDetailPage";

export const orderRoutes = [
    {
        path: "/my-account/orders/:orderID",
        element: <OrderDetailPage />
    }
]
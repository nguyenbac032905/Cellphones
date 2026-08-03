import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { Order } from "../types/order.type";
import { orderService } from "../services/order.service";

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await orderService.getAll();
                
                setOrders(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);
    return {orders, loading, error};
};
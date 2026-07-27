import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { Order } from "../types/order.type";
import { orderService } from "../services/order.service";

export const useOrder = (orderID: string) => {
    const [order, setOrder] = useState<Order>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if(!orderID) return;
                
                setLoading(true);
                setError("");

                const result = await orderService.get(orderID);
                
                setOrder(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [orderID]);
    return {order, loading, error};
};
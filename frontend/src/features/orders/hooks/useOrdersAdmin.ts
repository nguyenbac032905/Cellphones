import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { PaginationMeta } from "../../../shared/types/common.type";
import type { OrderQuery } from "../types/orderAdmin.type";
import type { Order } from "../types/order.type";
import { orderAdminService } from "../services/orderAdmin.service";

export const useOrdersAdmin = (query: OrderQuery) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 5,
        totalPages: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await orderAdminService.getAll(query);

            setOrders(res.data);
            setMeta(res.meta);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [
        query.orderStatus,
        query.fromDate,
        query.toDate,
        query.sort,
        query.page,
        query.limit,
    ]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return {
        orders,
        meta,
        loading,
        error,
        refetch: fetchOrders
    };
};
import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { RevenueChart, SaleQuery } from "../types/dashboard.type";
import { dashboardService } from "../services/dashboard.service";

export const useSale = (query: SaleQuery) => {
    const [revenueData, setRevenueData] = useState<RevenueChart | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const fetchSale = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await dashboardService.getSaleThisWeek(query);

            setRevenueData(res.data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [
        query.type
    ]);

    useEffect(() => {
        fetchSale();
    }, [fetchSale]);

    return {
        revenueData,
        loading,
        error
    };
};
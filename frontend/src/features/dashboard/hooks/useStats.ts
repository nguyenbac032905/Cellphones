import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { DashboardStats } from "../types/dashboard.type";
import { dashboardService } from "../services/dashboard.service";

export const useStats = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const fetchStats = useCallback(async () => {
        try {
            setError("");

            const res = await dashboardService.getStats();

            if (res.success) {
                setStats(res.data);
            }
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return {
        stats,
        loading,
        error
    };
};
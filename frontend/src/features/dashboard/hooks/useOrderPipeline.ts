import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { OrderPipelineItem } from "../types/dashboard.type";
import { dashboardService } from "../services/dashboard.service";

export const useOrderPipeline = () => {
    const [pipeline, setPipeline] = useState<OrderPipelineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const fetchPipeline = useCallback(async () => {
        try {
            setError("");

            const res = await dashboardService.getOrderPipeline();

            setPipeline(res.data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPipeline();
    }, [fetchPipeline]);

    return {
        pipeline,
        loading,
        error
    };
};
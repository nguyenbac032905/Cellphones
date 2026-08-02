import { privateAdmin } from "../../../shared/api/privateAdmin"
import type { DashboardStatsResponse, OrderPipelineResponse } from "../types/dashboard.type";

export const dashboardService = {
    getStats: async (): Promise<DashboardStatsResponse> => {
        const result = await privateAdmin.get<DashboardStatsResponse>("/admin/api/dashboard/stats");
        return result.data;
    },
    getOrderPipeline: async (): Promise<OrderPipelineResponse> => {
        const result = await privateAdmin.get<OrderPipelineResponse>("/admin/api/dashboard/order-pipeline");
        return result.data;
    }
}
import { privateAdmin } from "../../../shared/api/privateAdmin"
import type { DashboardStatsResponse, OrderPipelineResponse, RevenueChartResponse, SaleQuery } from "../types/dashboard.type";

export const dashboardService = {
    getStats: async (): Promise<DashboardStatsResponse> => {
        const result = await privateAdmin.get<DashboardStatsResponse>("/admin/api/dashboard/stats");
        return result.data;
    },
    getOrderPipeline: async (): Promise<OrderPipelineResponse> => {
        const result = await privateAdmin.get<OrderPipelineResponse>("/admin/api/dashboard/order-pipeline");
        return result.data;
    },
    getSaleThisWeek: async (query: SaleQuery): Promise<RevenueChartResponse> => {
        const result = await privateAdmin.get<RevenueChartResponse>("/admin/api/dashboard/sale-week", {params: query});
        return result.data;
    }
}
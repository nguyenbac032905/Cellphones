import type { ApiResponse } from "../../../shared/types/common.type";

export interface DashboardStat {
    title: string;
    value: number;
    change: string;
    isIncrease: boolean;
    timeframe: string;
}
export interface DashboardStats {
    totalRevenue: DashboardStat;
    totalOrders: DashboardStat;
    totalProductsSold: DashboardStat;
    totalNewUsers: DashboardStat;
}
export type DashboardStatsResponse = ApiResponse<DashboardStats>;

export interface OrderPipelineItem {
    title: string;
    count: number;
    description: string;
}
export type OrderPipelineResponse = ApiResponse<OrderPipelineItem[]>;
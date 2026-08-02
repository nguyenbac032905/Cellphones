import { getStatsService, orderPipelineService, saleWeekService } from "../../services/admin/dashboard.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";
import { SaleQuery } from "../../validations/admin/dashboard.validation";

export const getStats = asyncHandler(async (req: Request, res: Response) => {
    const result = await getStatsService();
    return res.status(200).json({
        success: true,
        data: result.data
    })
})
export const orderPipeline = asyncHandler(async (req: Request, res: Response) => {
    const result = await orderPipelineService();
    return res.status(200).json({
        success: true,
        data: result.data
    })
})
export const saleWeek = asyncHandler(async (req: Request, res: Response) => {
    const result = await saleWeekService(req.query as SaleQuery);
    return res.status(200).json({
        success: true,
        data: result.data
    })
})
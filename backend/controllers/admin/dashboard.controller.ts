import { getStatsService, orderPipelineService } from "../../services/admin/dashboard.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";

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
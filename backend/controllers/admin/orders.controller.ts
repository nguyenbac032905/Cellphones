import { getOrdersService } from "../../services/admin/orders.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
    const result = await getOrdersService(req.query);
    return res.status(200).json({
        success: true,
        data: result.data,
        meta: result.meta
    })
})
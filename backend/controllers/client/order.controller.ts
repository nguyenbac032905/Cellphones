import { createOrderService } from "../../services/client/order.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await createOrderService(user!._id.toString(),req.body);
    return res.status(201).json({
        success: true,
        data: result.data
    });
})
import { createOrderService, getOrderService, myOrdersService } from "../../services/client/order.service";
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
export const getOrder = asyncHandler(async (req: Request<{orderID: string}>, res: Response) => {
    const user = req.user;
    const result = await getOrderService(user!._id.toString(),req.params.orderID);
    return res.status(201).json({
        success: true,
        data: result.data
    });
})
export const myOrders = asyncHandler(async (req: Request<{orderID: string}>, res: Response) => {
    const user = req.user;
    const result = await myOrdersService(user!._id.toString());
    return res.status(201).json({
        success: true,
        data: result.data
    });
})
import { addItemService, bulkDeleteItemService, deleteItemService, editItemService, getCartService } from "../../services/client/cart.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";

export const getCart = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await getCartService(user?._id.toString());
    return res.status(200).json({
        success: true,
        data: result.data
    })
})
export const addItem = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await addItemService(user?._id.toString(), req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    })
})
export const editItem = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await editItemService(user?._id.toString(), req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    })
})
export const deleteItem = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await deleteItemService(user?._id.toString(), req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    })
})
export const bulkDeleteItem = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await bulkDeleteItemService(user?._id.toString(), req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    })
})
import { getCategoryTreeService } from "../../services/client/categories.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request,Response } from "express";

export const getCategoryTree = asyncHandler(async (req:Request, res: Response) => {
    const result = await getCategoryTreeService();
    return res.status(200).json({
        success: true,
        data: result.data
    });
});
import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

export const uploadImages = asyncHandler(async ( req: Request, res: Response ) => {
    const files = req.body.images;
    return res.status(200).json({
        success: true,
        data: { urls: files }
    });
});
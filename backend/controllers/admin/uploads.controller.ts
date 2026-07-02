import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";

export const uploadImages = async ( req: Request, res: Response ) => {
    try {
        const files = req.body.images;
        return res.status(200).json({
            success: true,
            data: { urls: files }
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: "Server error" });
    }
};
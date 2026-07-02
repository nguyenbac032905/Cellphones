import { Request, Response } from "express"
import { forceProductService, getProductDeleted, restoreProductService } from "../../services/admin/recycleBin.service"
import { AppError } from "../../utils/AppError";

export const products = async (req: Request, res: Response) => {
    try {
        const result = await getProductDeleted();
        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: "Server error"})
    }
};
export const restoreProduct = async (req: Request, res: Response) => {
    try {
        const { productID } = req.params;
        if (typeof productID !== "string" || productID.trim() === "") {
            throw new AppError("Invalid productID", 400);
        }
        const result = await restoreProductService(productID);
        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: error.message
            });
        }
        return res.status(500).json({
            error: "Server error"
        });
    }
};
export const forceProduct = async (req: Request, res: Response) => {
    try {
        const { productID } = req.params;
        if (typeof productID !== "string" || productID.trim() === "") {
            throw new AppError("Invalid productID", 400);
        }

        const result = await forceProductService(productID);
        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: error.message
            });
        }
        return res.status(500).json({
            error: "Server error"
        });
    }
};
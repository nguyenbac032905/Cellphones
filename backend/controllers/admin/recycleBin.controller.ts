import { Request, Response } from "express"
import { forceProductService, getProductDeleted, restoreProductService } from "../../services/admin/recycleBin.service"
import { asyncHandler } from "../../utils/asyncHandler";

export const products = asyncHandler(async (req: Request, res: Response) => {
    const result = await getProductDeleted();
    return res.status(200).json({
        success: true,
        ...result
    });
});
export const restoreProduct = asyncHandler(async (req: Request<{productID: string}>, res: Response) => {
    const { productID } = req.params;
    const result = await restoreProductService(productID);
    return res.status(200).json({
        success: true,
        ...result
    });
});
export const forceProduct = asyncHandler(async (req: Request<{productID: string}>, res: Response) => {
    const { productID } = req.params;

    const result = await forceProductService(productID);
    return res.status(200).json({
        success: true,
        ...result
    });
});
import { Request,Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getProductsByCategoryService, getProductsService } from "../../services/client/products.service";
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const result = await getProductsService(req.query);
    return res.status(200).json({
        success: true,
        data: result.data,
        meta: result.meta
    })
})
export const getProductsByCategory = asyncHandler(async (req:Request<{categorySlug: string}>, res: Response) => {
    const result = await getProductsByCategoryService(req.params.categorySlug);
    return res.status(200).json({
        success: true,
        data: result.data
    });
});
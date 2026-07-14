import { Request,Response } from "express";
import Product from "../../models/product.model";
import { asyncHandler } from "../../utils/asyncHandler";
import { getProductsByCategoryService } from "../../services/client/products.service";
export const index = async (req: Request, res: Response) => {
    const products = await Product.find({});
    res.status(200).json(products);
}
export const getProductsByCategory = asyncHandler(async (req:Request<{categorySlug: string}>, res: Response) => {
    const result = await getProductsByCategoryService(req.params.categorySlug);
    return res.status(200).json({
        success: true,
        data: result.data
    });
});
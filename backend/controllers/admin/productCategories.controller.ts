import { Request, Response } from "express"
import { createCategoryService, getCategoriesService, getCategoryTreeService } from "../../services/admin/productCategories.service";
import { asyncHandler } from "../../utils/asyncHandler";
export const getCategoryTree = asyncHandler(async (req:Request, res: Response) => {
    const result = await getCategoryTreeService();
    return res.status(200).json({
        success: true,
        ...result
    });
});
export const getCategories = asyncHandler(async (req:Request, res: Response) => {
    const result = await getCategoriesService(req.query);
    return res.status(200).json({
        success: true,
        data: result.data,
        meta: result.meta
    });
});
export const createCategory = asyncHandler(async (req:Request, res: Response) => {
    const result = await createCategoryService(req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    });
});
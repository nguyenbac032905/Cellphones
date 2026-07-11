import { Request, Response } from "express"
import { createCategoryService, deleteCategoryService, getCategoriesService, getCategoryService, getCategoryTreeService, updateCategoryService } from "../../services/admin/productCategories.service";
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
export const updateCategory = asyncHandler(async (req: Request<{categoryID: string}>, res: Response) => {
    const result = await updateCategoryService(req.params.categoryID,req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    });
});
export const getCategory = asyncHandler(async (req: Request<{categoryID: string}>, res: Response) => {
    const result = await getCategoryService(req.params.categoryID);
    return res.status(200).json({
        success: true,
        data: result.data
    });
});
export const deleteCategory = asyncHandler(async (req: Request<{categoryID: string}>, res: Response) => {
    const result = await deleteCategoryService(req.params.categoryID);
    return res.status(200).json({
        success: true,
        message: result.message
    });
});
import { Request,Response } from "express";
import { createProductService, deleteProductService, getProductByIDService, getProducts, updateProductService } from "../../services/admin/products.service";
import { asyncHandler } from "../../utils/asyncHandler";
export const index = asyncHandler(async (req: Request, res: Response) => {
    const result = await getProducts(req.query);
    return res.status(200).json({
        success: true,
        ...result
    });
});
export const updateProduct = asyncHandler(async (req: Request<{productID: string}>, res: Response) => {
    const { productID } = req.params;
    const result = await updateProductService(productID, req.body);
    return res.status(200).json({
        success: true,
        ...result
    });
});
export const deleteProduct = asyncHandler(async (req: Request<{productID: string}>, res: Response) => {
    const { productID } = req.params; 
    const result = await deleteProductService(productID);
    return res.status(200).json({
        success: true,
        ...result
    });
});
export const detail = asyncHandler(async (req: Request<{productID: string}>, res: Response) => {
    const { productID } = req.params;

    const result = await getProductByIDService(productID);
    return res.status(200).json({
        success: true,
        ...result
    });
});
export const createProduct = asyncHandler(async (req:Request, res: Response) => {
    const result = await createProductService(req.body);
    return res.status(201).json({
        success: true,
        ...result
    });
});
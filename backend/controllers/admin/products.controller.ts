import { Request,Response } from "express";
import { deleteProductService, getProductByIDService, getProducts, updateProductService } from "../../services/admin/products.service";
import { AppError } from "../../utils/AppError";
export const index = async (req: Request, res: Response) => {
    try {
        const result = await getProducts(req.query);
        return res.status(200).json(result);
    } catch (error: any) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: "Server error"})
    }
}
export const updateProduct = async (req:Request, res: Response) => {
    try {
        const { productID } = req.params;
        if (
            typeof productID !== "string" ||
            productID.trim() === ""
        ) {
            throw new AppError("Invalid product id", 400);
        }
        const result = await updateProductService(productID, req.body);
        return res.status(200).json(result);
    } catch (error: any) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: "Server error"});
    }
}
export const deleteProduct = async (req:Request, res: Response) => {
    try {
        const { productID } = req.params;
        if (
            typeof productID !== "string" ||
            productID.trim() === ""
        ) {
            throw new AppError("Invalid product id", 400);
        }
        const result = await deleteProductService(productID);
        return res.status(200).json(result);
    } catch (error: any) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: "Server error"});
    }
}
export const detail = async (req: Request, res: Response) => {
    try {
        const { productID } = req.params;
        if (typeof productID !== "string" || productID.trim() === ""){
            throw new AppError("Invalid product id", 400);
        }
        const result = await getProductByIDService(productID);
        return res.status(200).json(result);
    } catch (error: any) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: "Server error"})
    }
}
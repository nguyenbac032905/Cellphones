import { Request,Response } from "express";
import { getProducts, updateProductService } from "../../services/admin/products.service";
export const index = async (req: Request, res: Response) => {
    try {
        const result = await getProducts(req.query);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({error: "Server error"})
    }
}
export const updateProduct = async (req:Request, res: Response) => {
    try {
        const result = await updateProductService(req);
        return res.status(200).json(result);
    } catch (error: any) {
        if(error.statusCode){
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: "Server error"});
    }
}
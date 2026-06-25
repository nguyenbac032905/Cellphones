import { Request,Response } from "express";
import { getProducts } from "../../services/admin/products.service";
export const index = async (req: Request, res: Response) => {
    try {
        const result = await getProducts(req.query);
        return res.status(200).json({...result})
    } catch (error) {
        return res.status(500).json({error: "Server error"})
    }
}
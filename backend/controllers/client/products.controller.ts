import { Request,Response } from "express";
import Product from "../../models/product.model";
export const index = async (req: Request, res: Response) => {
    const products = await Product.find({});
    res.status(200).json(products);
}
import { Request, Response } from "express"
import { getCategoryTreeService } from "../../services/admin/productCategories.service";
export const getCategoryTree = async (req:Request, res: Response) => {
    try {
        const result = await getCategoryTreeService();
        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        return res.status(500).json({error: "Server error"});
    }
}
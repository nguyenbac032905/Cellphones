import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getBranchesService } from "../../services/client/branches.service";

export const getBranches = asyncHandler(async (req: Request, res: Response) => {
    const result = await getBranchesService();
    return res.status(200).json({
        success: true,
        data: result.data
    });
});

import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getRolesService } from "../../services/admin/roles.service";
export const getRoles = asyncHandler(async (req: Request, res: Response) => {
    const result = await getRolesService();
    return res.status(200).json({
        success: true,
        ...result
    })
});
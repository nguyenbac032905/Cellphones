import { Request,Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getUsersService } from "../../services/admin/users.service";
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await getUsersService(req.query);
    return res.status(200).json({
        success: true,
        data: result.data,
        meta: result.meta
    })
});
import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { createRoleService, getRoleService, getRolesService, updateRoleService } from "../../services/admin/roles.service";
export const getRoles = asyncHandler(async (req: Request, res: Response) => {
    const result = await getRolesService();
    return res.status(200).json({
        success: true,
        data: result.data
    })
});
export const getRole = asyncHandler(async (req: Request<{roleID: string}>, res: Response) => {
    const roleID = req.params.roleID;
    const result = await getRoleService(roleID);
    return res.status(200).json({
        success: true,
        data: result.data
    })
});
export const createRole = asyncHandler(async (req: Request, res: Response) => {
    const result = await createRoleService(req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    })
});
export const updateRole = asyncHandler(async (req: Request<{roleID: string}>, res: Response) => {
    const roleID = req.params.roleID
    const result = await updateRoleService(roleID,req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    })
});
import { Request,Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { createUserService, getUsersService } from "../../services/admin/users.service";
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await getUsersService(req.query);
    return res.status(200).json({
        success: true,
        data: result.data,
        meta: result.meta
    })
});
export const createUser = asyncHandler( async ( req: Request, res: Response ) => {
    const {fullName,email,password, roleID} = req.body;
    const result = await createUserService( fullName, email, password, roleID);
    return res.status(201).json({
        success: true,
        message: result.message
    });
});
import { Request,Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { createUserService, deleteUserService, getUserService, getUsersService, updateUserService } from "../../services/admin/users.service";
import { AppError } from "../../utils/AppError";
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
export const getUser = asyncHandler(async (req: Request<{userID: string}>, res: Response) => {
    const {userID} = req.params;
    const result = await getUserService(userID);
    return res.status(200).json({
        success: true,
        data: result.data,
    })
});
export const updateUser = asyncHandler(async (req: Request<{userID: string}>, res: Response) => {
    const {userID} = req.params;
    const result = await updateUserService(userID, req.body);
    return res.status(200).json({
        success: true,
        message: result.message,
    })
});
export const deleteUser = asyncHandler(async (req: Request<{userID: string}>, res: Response) => {
    const {userID} = req.params;
    if (userID === req.user!._id.toString()) {
        throw new AppError("You cannot delete your own account", 400);
    }
    const result = await deleteUserService(userID);
    return res.status(200).json({
        success: true,
        message: result.message
    })
});

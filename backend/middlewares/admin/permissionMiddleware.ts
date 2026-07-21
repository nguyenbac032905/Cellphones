import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";
import { AuthenticatedAdmin } from "../../types/auth.type";

export const permissionMiddleware = (permission: string) => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const admin = req.user as AuthenticatedAdmin;
        const permissions = admin.roleID?.permissions ?? [];

        if (!permissions.includes(permission)) {
            throw new AppError("Forbidden", 403);
        }
        next();
    });
};
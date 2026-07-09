import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { AppError } from "../../utils/AppError";

export const permissionMiddleware = (permission: string) => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const permissions = req.user?.roleID?.permissions ?? [];

        if (!permissions.includes(permission)) {
            throw new AppError("Forbidden", 403);
        }
        next();
    });
};
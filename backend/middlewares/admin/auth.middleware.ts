import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Role from "../../models/role.model";
import { AccessTokenPayload } from "../../types/auth.type";
import { AppError } from "../../utils/AppError";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access token is required" });
        }
        const accessToken = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET!
        ) as AccessTokenPayload;
        
        const role = await Role.findOne({
            _id: decoded.roleID,
            deleted: false,
        }).lean();
        if (!role) {
            throw new AppError("Role not found", 404);
        }
        
        req.user = {
            ...decoded,
            permissions: role.permissions,
        };
        next();
    } catch (error: any) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
            });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access token expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid access token" });
        }
        return res.status(500).json({ message: "Server error" });
    }
};
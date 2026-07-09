    import { NextFunction, Request, Response } from "express";
    import jwt from "jsonwebtoken";
    import Role from "../../models/role.model";
    import { AccessTokenPayload } from "../../types/auth.type";
    import { AppError } from "../../utils/AppError";
    import User from "../../models/user.model";

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
            
            const user = await User.findOne({_id: decoded._id}).populate("roleID","permissions").lean(); 
            if (!user) {
                throw new AppError("User not found", 404);
            }
            req.user = user;
            next();
        } catch (error: any) {
            if(error instanceof AppError){
                return res.status(error.statusCode).json({message: error.message});
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
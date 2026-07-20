import { registerService, setPasswordService, verifyTokenService } from "../../services/client/auth.service";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const result = await registerService(req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    })
})
export const verifyToken = asyncHandler(async (req: Request, res: Response) => {
    const result = await verifyTokenService(req.body);
    res.cookie("registerToken", result.registerToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/api/auth/set-password",
        maxAge: 30 * 60 * 1000
    });
    return res.status(200).json({
        success: true,
        message: result.message
    })
})
export const setPassword = asyncHandler(async (req:Request, res: Response) => {
    const registerToken = req.cookies.registerToken;
    if(!registerToken){
        throw new AppError("Register token is required.", 401);
    }
    const result = await setPasswordService(req.body,registerToken);
    res.clearCookie("registerToken");
    return res.status(200).json({
        success: true,
        message: result.message
    })
})
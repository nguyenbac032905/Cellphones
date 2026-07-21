import { loginService, logoutService, refreshTokenService, registerService, setPasswordService, verifyTokenService } from "../../services/client/auth.service";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const result = await registerService(req.body);
    return res.status(200).json({
        success: true,
        message: result.message
    })
});
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
});
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
});
export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.cookie("refreshToken", result.newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.json({
        success: true,
        message: result.message,
        data: {
            accessToken: result.newAccessToken,
            user: result.user,
        }
    });
});
export const refreshToken = asyncHandler(async ( req: Request, res: Response ) => {
    const refreshToken = req.cookies?.refreshToken;
    const result = await refreshTokenService(refreshToken);
    return res.status(200).json({
        success: true,
        data: {
            accessToken: result.accessToken
        }
    });
});
export const getMe = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    return res.status(200).json({
        success: true,
        data: {
            user: user
        }
    });
});
export const logout = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await logoutService(user._id.toString());
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    return res.json({
        success: true,
        message: result.message,
    });
});
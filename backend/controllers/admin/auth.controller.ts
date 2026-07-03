import { Request, Response } from "express";
import { loginService, refreshTokenService, registerService } from "../../services/admin/auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

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
export const register = asyncHandler( async ( req: Request, res: Response ) => {
    const {fullName,email,password, roleID} = req.body;
    const result = await registerService( fullName, email, password, roleID);
    res.cookie("refreshToken", result.newRefreshToken,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    );
    return res.status(201).json({
        success: true,
        message: result.message,
        data: {
            accessToken:result.newAccessToken,
            user: result.user
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
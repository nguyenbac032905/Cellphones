import { Request, Response } from "express";
import { loginService, refreshTokenService, registerService } from "../../services/admin/auth.service";
import { AppError } from "../../utils/AppError";

export const login = async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: "server error" });
    }
};
export const register = async (
    req: Request,
    res: Response
) => {
    try {
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
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: "server error"});
    }
};
export const refreshToken = async (
    req: Request,
    res: Response
) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        const result = await refreshTokenService(refreshToken);
        return res.status(200).json({
            success: true,
            data: {
                accessToken: result.accessToken
            }
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: "server error"});
    }
};
export const getMe = async (req: Request, res: Response) => {
    try{
        const user = (req as any).user;
        return res.status(200).json({
            success: true,
            data: {
                user: user
            }
        });
    }catch(error){
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: "server error"});
    }
};
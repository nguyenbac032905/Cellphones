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
            maxAge: 1000 * 60 * 3,
        });
        return res.json({
            message: result.message,
            accessToken: result.newAccessToken,
            user: result.user,
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
                maxAge: 1000 * 60 * 3
            }
        );

        return res.status(201).json({
            message: result.message,
            accessToken:result.newAccessToken,
            user: result.user
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
        console.log("da refresh")
        const refreshToken = req.cookies?.refreshToken;
        const result = await refreshTokenService(refreshToken);
        console.log(refreshToken);
        return res.status(200).json({
            accessToken: result.accessToken
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        return res.status(500).json({error: "server error"});
    }
};
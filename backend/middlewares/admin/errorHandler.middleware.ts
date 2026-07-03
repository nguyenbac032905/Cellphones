import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";

export const errorHandlerMiddleware = ( error: any, req: Request, res: Response, next: NextFunction ) => {
    console.log(error)
    // appError
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errors: error.errors || null
        });
    }
    //server error
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};
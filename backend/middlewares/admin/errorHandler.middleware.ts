import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import multer from "multer";

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
    //multer error
    if (error instanceof multer.MulterError) {

        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "Each image must be smaller than 1MB"
            });
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                success: false,
                message: "Maximum 10 images allowed"
            });
        }
    }
    //server error
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

export const validate = (schema: ZodObject<any>) => async (req: Request,res: Response,next: NextFunction) => {
    try {
        req.body = await schema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        }
        next(error);
    }
};
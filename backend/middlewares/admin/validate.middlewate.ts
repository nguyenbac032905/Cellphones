import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";
import { AppError } from "../../utils/AppError";

export const validateMiddlware = (schema: ZodObject<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = await schema.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query
        });

        req.body = parsed.body;
        //params và query là geter của Exxpress nên không thể gán bằng toán tử =
        Object.assign(req.params, parsed.params);
        Object.assign(req.query, parsed.query);
        
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return next(
                new AppError(
                    "Validation failed",
                    400,
                    error.issues.map((issue) => ({
                        field: issue.path.join("."),
                        message: issue.message
                    }))
                )
            );
        }
        next(error);
    }
};
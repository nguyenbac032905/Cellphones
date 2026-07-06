import { NextFunction, Request, Response } from "express";
import requestLogger from "../../config/requestLogger";

const requestLoggingMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // tắt logging
    if (process.env.NODE_ENV !== "production") {
        return next();
    }
    const start = Date.now();

    res.on("finish", () => {
        const responseTime = Date.now() - start;

        requestLogger.info({
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            responseTime: `${responseTime}ms`,
            time: new Date().toISOString(),
        });
    });

    next();
};

export default requestLoggingMiddleware;
import rateLimit from "express-rate-limit";

export const globalRateLimitMiddleware = rateLimit({
    windowMs: 15*60*1000,
    max:300,
    // express sẽ trả về các header chuẩn mới cho biết còn bao nhiêu request,..
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests, please try again later"
    }
});

export const loginRateLimitMiddleware = rateLimit({
    windowMs: 15*60*1000,
    max: 5,
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many requests, please try again later"
    }
});


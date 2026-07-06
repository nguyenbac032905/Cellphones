import rateLimit from "express-rate-limit";

export const globalRateLimitMiddleware = rateLimit({
    windowMs: 15*60*1000,
    max:300,
    // express sẽ trả về các header chuẩn mới cho biết còn bao nhiêu request,..
    standardHeaders: true,
    // tắt các header cũ
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests, please try again later"
    }
});
//auth
export const loginRateLimitMiddleware = rateLimit({
    windowMs: 15*60*1000,
    max: 5,
    //chỉ tính request lỗi
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many requests, please try again later"
    }
});
export const rateLimitRegisterMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,

    // chỉ tính request thành công
    skipFailedRequests: true,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many register attempts, please try again later"
    },
});
//recycle bin
export const forceDeleteRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many force delete requests"
    }
});
//upload
export const uploadRateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many upload requests, please try again later"
    }
});


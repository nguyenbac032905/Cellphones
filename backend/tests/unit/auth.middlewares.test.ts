import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../../middlewares/admin/auth.middleware";

jest.mock("jsonwebtoken", () => ({
    verify: jest.fn()
}));

describe("authMiddleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        next = jest.fn();

        jest.clearAllMocks();
    });

    describe("Validate authorization header", () => {
        it("Khi không truyền authorization thì trả về 401", () => {
            authMiddleware(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: "Access token is required"
            });

            expect(jwt.verify).not.toHaveBeenCalled();
            expect(next).not.toHaveBeenCalled();
        });

        it("Khi authorization không bắt đầu bằng Bearer thì trả về 401", () => {
            req.headers = {
                authorization: "abcxyz"
            };

            authMiddleware(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: "Access token is required"
            });

            expect(jwt.verify).not.toHaveBeenCalled();
            expect(next).not.toHaveBeenCalled();
        });

        it("Khi header là 'Bearer ' không kèm token thì trả về Invalid access token", () => {
            req.headers = {
                authorization: "Bearer "
            };

            (jwt.verify as jest.Mock).mockImplementation(() => {
                const error: any = new Error("jwt must be provided");
                error.name = "JsonWebTokenError";
                throw error;
            });

            authMiddleware(req as Request, res as Response, next);

            expect(jwt.verify).toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid access token"
            });

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("Handle JWT errors", () => {
        it("Khi access token hết hạn thì trả về 401", () => {
            req.headers = {
                authorization: "Bearer expired_token"
            };

            (jwt.verify as jest.Mock).mockImplementation(() => {
                const error: any = new Error("Token expired");
                error.name = "TokenExpiredError";
                throw error;
            });

            authMiddleware(req as Request, res as Response, next);

            expect(jwt.verify).toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: "Access token expired"
            });

            expect(next).not.toHaveBeenCalled();
        });

        it("Khi access token không hợp lệ thì trả về 401", () => {
            req.headers = {
                authorization: "Bearer invalid_token"
            };

            (jwt.verify as jest.Mock).mockImplementation(() => {
                const error: any = new Error("Invalid token");
                error.name = "JsonWebTokenError";
                throw error;
            });

            authMiddleware(req as Request, res as Response, next);

            expect(jwt.verify).toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid access token"
            });

            expect(next).not.toHaveBeenCalled();
        });

        it("Khi xảy ra lỗi khác thì trả về 500", () => {
            req.headers = {
                authorization: "Bearer token"
            };

            (jwt.verify as jest.Mock).mockImplementation(() => {
                throw new Error("Server error");
            });

            authMiddleware(req as Request, res as Response, next);

            expect(jwt.verify).toHaveBeenCalled();

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: "Server error"
            });

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("Success flow", () => {
        it("Khi access token hợp lệ thì gọi next và gán user vào req", () => {
            req.headers = {
                authorization: "Bearer valid_token"
            };

            const decoded = {
                userId: "123",
                role: "admin"
            };

            (jwt.verify as jest.Mock).mockReturnValue(decoded);

            authMiddleware(req as Request, res as Response, next);

            expect(jwt.verify).toHaveBeenCalledWith(
                "valid_token",
                process.env.JWT_ACCESS_SECRET
            );

            expect((req as any).user).toEqual(decoded);

            expect(next).toHaveBeenCalled();

            expect(res.status).not.toHaveBeenCalled();
        });
    });
});
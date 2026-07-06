import type { Request, Response, NextFunction } from "express";
import multer from "multer";
import { errorHandlerMiddleware } from "../../middlewares/admin/errorHandler.middleware";
import { AppError } from "../../utils/AppError";

describe("errorHandlerMiddleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
        req = {};
        // status() phải trả về chính res để chain .json() được, giống Express thật
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();

        // Middleware có console.log(error) — che đi để log test sạch
        consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
        jest.clearAllMocks();
    });

    describe("AppError", () => {
        it("phải trả về đúng statusCode, message và errors của AppError", () => {
            const error = new AppError("Product not found", 404, [
                { field: "id", message: "not found" }
            ]);

            errorHandlerMiddleware(error, req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Product not found",
                errors: [{ field: "id", message: "not found" }]
            });
        });

        it("khi AppError không có errors thì phải trả errors: null (không phải undefined)", () => {
            const error = new AppError("Something failed", 400);

            errorHandlerMiddleware(error, req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Something failed",
                errors: null
            });
        });

        it("không được gọi next() khi đã xử lý AppError", () => {
            const error = new AppError("Product not found", 404);

            errorHandlerMiddleware(error, req as Request, res as Response, next);

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("MulterError", () => {
        it("LIMIT_FILE_SIZE phải trả về 400 với message giới hạn dung lượng ảnh", () => {
            const error = new multer.MulterError("LIMIT_FILE_SIZE");

            errorHandlerMiddleware(error, req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Each image must be smaller than 1MB"
            });
        });

        it("LIMIT_FILE_COUNT phải trả về 400 với message giới hạn số lượng ảnh", () => {
            const error = new multer.MulterError("LIMIT_FILE_COUNT");

            errorHandlerMiddleware(error, req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Maximum 10 images allowed"
            });
        });

        it("MulterError với code không xác định phải trả về 400 cùng message gốc", () => {
            const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE");

            errorHandlerMiddleware(error, req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);

            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: error.message
            });

            expect(next).not.toHaveBeenCalled();
        });

        it("không được gọi next() khi đã xử lý MulterError", () => {
            const error = new multer.MulterError("LIMIT_FILE_SIZE");

            errorHandlerMiddleware(error, req as Request, res as Response, next);

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("Lỗi không xác định (server error)", () => {
        it("Error thông thường (không phải AppError/MulterError) phải trả về 500", () => {
            const error = new Error("Unexpected database crash");

            errorHandlerMiddleware(error, req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Internal server error"
            });
        });

        it("không được lộ message/stack gốc của lỗi ra response (tránh leak thông tin nội bộ)", () => {
            const error = new Error("secret db connection string leaked here");

            errorHandlerMiddleware(error, req as Request, res as Response, next);

            const jsonArg = (res.json as jest.Mock).mock.calls[0][0];
            expect(JSON.stringify(jsonArg)).not.toContain("secret db connection string");
        });

        it("giá trị lỗi không phải instance Error (ví dụ throw string/object) vẫn phải trả về 500, không crash middleware", () => {
            const error = "just a plain string error";

            expect(() => {
                errorHandlerMiddleware(error, req as Request, res as Response, next);
            }).not.toThrow();

            expect(res.status).toHaveBeenCalledWith(500);
        });

        it("không được gọi next() khi rơi vào nhánh server error", () => {
            const error = new Error("boom");

            errorHandlerMiddleware(error, req as Request, res as Response, next);

            expect(next).not.toHaveBeenCalled();
        });
    });
});

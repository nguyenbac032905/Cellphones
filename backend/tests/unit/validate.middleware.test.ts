import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { validateMiddlware } from "../../middlewares/shared/validate.middleware";
import { AppError } from "../../utils/AppError";

describe("validateMiddlware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            query: {}
        };

        res = {};

        next = jest.fn();

        jest.clearAllMocks();
    });

    describe("Validation success", () => {
        it("Khi dữ liệu hợp lệ thì gọi next và gán parsed data vào req", async () => {
            const schema = z.object({
                body: z.object({
                    name: z.string(),
                    age: z.number()
                }),
                params: z.object({
                    id: z.string()
                }),
                query: z.object({
                    search: z.string()
                })
            });

            req.body = {
                name: "Bac",
                age: 20
            };

            req.params = {
                id: "123"
            };

            req.query = {
                search: "iphone"
            };

            const middleware = validateMiddlware(schema);

            await middleware(req as Request, res as Response, next);

            expect(req.body).toEqual({
                name: "Bac",
                age: 20
            });

            expect(req.params).toEqual({
                id: "123"
            });

            expect(req.query).toEqual({
                search: "iphone"
            });

            expect(next).toHaveBeenCalledWith();
        });

        it("Khi schema transform dữ liệu thì req phải chứa dữ liệu mới", async () => {
            const schema = z.object({
                body: z.object({
                    age: z.string().transform(Number)
                }),
                params: z.object({}),
                query: z.object({})
            });

            req.body = {
                age: "20"
            };

            const middleware = validateMiddlware(schema);

            await middleware(req as Request, res as Response, next);

            expect(req.body).toEqual({
                age: 20
            });

            expect(next).toHaveBeenCalledWith();
        });
    });

    describe("Validation failed", () => {
        it("Khi dữ liệu không hợp lệ thì next phải được gọi với AppError", async () => {
            const schema = z.object({
                body: z.object({
                    email: z.string().email()
                }),
                params: z.object({}),
                query: z.object({})
            });

            req.body = {
                email: "invalid-email"
            };

            const middleware = validateMiddlware(schema);

            await middleware(req as Request, res as Response, next);

            expect(next).toHaveBeenCalled();

            const errorPassed = (next as jest.Mock).mock.calls[0][0];

            expect(errorPassed).toBeInstanceOf(AppError);

            expect(errorPassed.message).toBe("Validation failed");

            expect(errorPassed.statusCode).toBe(400);

            expect(errorPassed.errors).toEqual([
                {
                    field: "body.email",
                    message: "Invalid email address"
                }
            ]);
        });

        it("Khi có nhiều lỗi validation thì phải trả về đầy đủ errors", async () => {
            const schema = z.object({
                body: z.object({
                    email: z.string().email(),
                    password: z.string().min(6)
                }),
                params: z.object({}),
                query: z.object({})
            });

            req.body = {
                email: "abc",
                password: "123"
            };

            const middleware = validateMiddlware(schema);

            await middleware(req as Request, res as Response, next);

            const errorPassed = (next as jest.Mock).mock.calls[0][0];

            expect(errorPassed).toBeInstanceOf(AppError);

            expect(errorPassed.errors).toHaveLength(2);
        });
    });

    describe("Unexpected error", () => {
        it("Khi xảy ra lỗi ngoài ZodError thì next phải được gọi với error đó", async () => {
            const unexpectedError = new Error("Database error");

            const schema = {
                parseAsync: jest.fn().mockRejectedValue(unexpectedError)
            };

            const middleware = validateMiddlware(schema as any);

            await middleware(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(unexpectedError);
        });
    });
});
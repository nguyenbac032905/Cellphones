import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import User from "../../models/user.model";
import { connectTestDB, closeTestDB, clearTestDB } from "../setup/setup";
import { createTestAdmin } from "../helpers/user.helper";
import jwt from "jsonwebtoken";

beforeAll(connectTestDB);
afterEach(clearTestDB);
afterAll(closeTestDB);

const PREFIX = "/admin/api/auth";

describe("Auth integration", () => {
    describe("POST /register", () => {
        it("thiếu roleID -> 400 (validateMiddleware thật)", async () => {
            const res = await request(app).post(`${PREFIX}/register`).send({
                fullName: "Test Admin",
                email: "noroleid@test.com",
                password: "123456",
            });
            expect(res.status).toBe(400);
        });

        it("hợp lệ -> 201, trả accessToken, set cookie refreshToken, lưu user thật vào DB", async () => {
            const res = await request(app).post(`${PREFIX}/register`).send({
                fullName: "Test Admin",
                email: "register-success@test.com",
                password: "123456",
                roleID: new mongoose.Types.ObjectId().toString(),
            });

            expect(res.status).toBe(201);
            expect(res.body.data.accessToken).toBeDefined();
            expect(res.headers["set-cookie"][0]).toMatch(/refreshToken=/);

            const inDb = await User.findOne({ email: "register-success@test.com" });
            expect(inDb).not.toBeNull();
            expect(inDb!.refreshToken).toBeDefined(); // xác nhận refreshToken thật được lưu vào DB
        });

        it("email đã tồn tại -> 400", async () => {
            await request(app).post(`${PREFIX}/register`).send({
                fullName: "Test Admin",
                email: "duplicate@test.com",
                password: "123456",
                roleID: new mongoose.Types.ObjectId().toString(),
            });

            const res = await request(app).post(`${PREFIX}/register`).send({
                fullName: "Test Admin 2",
                email: "duplicate@test.com",
                password: "123456",
                roleID: new mongoose.Types.ObjectId().toString(),
            });

            expect(res.status).toBe(400);
        });
    });
    describe("POST /login", () => {
        it("email không tồn tại -> 400", async () => {
            const res = await request(app).post(`${PREFIX}/login`).send({
                email: "notfound@test.com",
                password: "123456",
            });
            expect(res.status).toBe(400);
        });

        it("sai password -> 400", async () => {
            await createTestAdmin({ email: "wrongpass@test.com", password: "123456" });

            const res = await request(app).post(`${PREFIX}/login`).send({
                email: "wrongpass@test.com",
                password: "sai-mat-khau",
            });
            expect(res.status).toBe(400);
        });

        it("tài khoản accountType=user (không phải admin) -> 400", async () => {
            await createTestAdmin({
                email: "notadmin@test.com",
                accountType: "user",
            });

            const res = await request(app).post(`${PREFIX}/login`).send({
                email: "notadmin@test.com",
                password: "123456",
            });
            expect(res.status).toBe(400);
        });

        it("tài khoản bị khoá (status=inactive) -> 400", async () => {
            await createTestAdmin({
                email: "locked@test.com",
                status: "inactive",
            });

            const res = await request(app).post(`${PREFIX}/login`).send({
                email: "locked@test.com",
                password: "123456",
            });
            expect(res.status).toBe(400);
        });

        it("login thành công -> 200, trả accessToken, set cookie refreshToken, lưu refreshToken thật vào DB", async () => {
            const { user, rawPassword } = await createTestAdmin({
                email: "loginok@test.com",
            });

            const res = await request(app).post(`${PREFIX}/login`).send({
                email: "loginok@test.com",
                password: rawPassword,
            });

            expect(res.status).toBe(200);
            expect(res.body.data.accessToken).toBeDefined();
            expect(res.headers["set-cookie"][0]).toMatch(/refreshToken=/);

            const updated = await User.findById(user._id);
            expect(updated!.refreshToken).toBeDefined();
        });
    });
    describe("GET /refresh-token", () => {
        it("không có cookie -> 401", async () => {
            const res = await request(app).get(`${PREFIX}/refresh-token`);
            expect(res.status).toBe(401);
        });

        it("cookie sai định dạng / không verify được -> 401", async () => {
            const res = await request(app)
            .get(`${PREFIX}/refresh-token`)
            .set("Cookie", ["refreshToken=day-la-token-gia-mao"]);
            expect(res.status).toBe(401);
        });

        it("cookie hợp lệ -> 200, trả về accessToken mới", async () => {
            await createTestAdmin({ email: "refresh-ok@test.com" });

            const loginRes = await request(app).post(`${PREFIX}/login`).send({
                email: "refresh-ok@test.com",
                password: "123456",
            });
            const cookie = loginRes.headers["set-cookie"];

            const res = await request(app)
            .get(`${PREFIX}/refresh-token`)
            .set("Cookie", cookie);

            expect(res.status).toBe(200);
            expect(res.body.data.accessToken).toBeDefined();
        });

        it("refreshToken đã bị revoke (login lần 2 ghi đè) -> 401", async () => {
            await createTestAdmin({ email: "revoked@test.com" });

            // login lần 1, lấy cookie A
            const firstLogin = await request(app).post(`${PREFIX}/login`).send({
                email: "revoked@test.com",
                password: "123456",
            });
            const oldCookie = firstLogin.headers["set-cookie"];
            //chờ 1 giây, nếu như login cùng lúc thì sinh cùng refreshtoken
            await new Promise((resolve) => setTimeout(resolve, 1100));
            // login lần 2 -> refreshToken mới ghi đè lên DB, cookie A giờ đã "cũ"
            await request(app).post(`${PREFIX}/login`).send({
                email: "revoked@test.com",
                password: "123456",
            });

            // dùng lại cookie A (đã bị revoke) để refresh
            const res = await request(app)
            .get(`${PREFIX}/refresh-token`)
            .set("Cookie", oldCookie);

            expect(res.status).toBe(401);
        });
    });
    describe("GET /me", () => {
        it("không có header Authorization -> 401", async () => {
            const res = await request(app).get(`${PREFIX}/me`);
            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Access token is required");
        });

        it("header không đúng format Bearer -> 401", async () => {
            const res = await request(app)
            .get(`${PREFIX}/me`)
            .set("Authorization", "day-la-token-khong-co-bearer");
            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Access token is required");
        });

        it("token ký bằng secret sai -> 401 Invalid access token", async () => {
            const fakeToken = jwt.sign({ _id: "user-id" }, "secret-gia-mao", {
                expiresIn: "15m",
            });

            const res = await request(app)
            .get(`${PREFIX}/me`)
            .set("Authorization", `Bearer ${fakeToken}`);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Invalid access token");
        });

        it("token đã hết hạn -> 401 Access token expired", async () => {
            const expiredToken = jwt.sign(
                { _id: "user-id" },
                process.env.JWT_ACCESS_SECRET as string,
                { expiresIn: "-10s" } // ký với thời hạn đã âm -> hết hạn ngay lập tức
            );

            const res = await request(app)
            .get(`${PREFIX}/me`)
            .set("Authorization", `Bearer ${expiredToken}`);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Access token expired");
        });

        it("token hợp lệ -> 200, trả đúng thông tin user đã decode", async () => {
            const { user } = await createTestAdmin({ email: "me-ok@test.com" });

            const validToken = jwt.sign(
                { _id: user._id.toString(), email: user.email },
                process.env.JWT_ACCESS_SECRET as string,
                { expiresIn: "15m" }
            );

            const res = await request(app)
            .get(`${PREFIX}/me`)
            .set("Authorization", `Bearer ${validToken}`);

            expect(res.status).toBe(200);
            expect(res.body.data.user.email).toBe("me-ok@test.com");
        });
    });
});
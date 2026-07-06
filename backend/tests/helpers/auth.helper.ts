import request from "supertest";
import { Express } from "express";
import mongoose from "mongoose";

export const getAuthToken = async (app: Express) => {
    const res = await request(app).post("/admin/api/auth/register").send({
        fullName: "Test Admin",
        email: `admin${Date.now()}@test.com`,
        password: "123456",
        roleID: new mongoose.Types.ObjectId().toString(),
    });

    if (!res.body?.data?.accessToken) {
        // log ra để dễ debug nếu vẫn lỗi lần sau
        console.error("Register response:", res.status, res.body);
    }

    return res.body.data.accessToken as string;
};
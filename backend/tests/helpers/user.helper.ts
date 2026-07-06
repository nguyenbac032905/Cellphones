import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../../models/user.model";

type CreateAdminOptions = {
    email?: string;
    password?: string;
    status?: "active" | "inactive";
    accountType?: "admin" | "user";
};

export const createTestAdmin = async (options: CreateAdminOptions = {}) => {
    const password = options.password ?? "123456";
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName: "Test Admin",
        email: options.email ?? `admin${Date.now()}@test.com`,
        password: hashed,
        accountType: options.accountType ?? "admin",
        roleID: new mongoose.Types.ObjectId(),
        status: options.status ?? "active",
    });

    return { user, rawPassword: password };
};
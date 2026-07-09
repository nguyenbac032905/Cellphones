import User from "../../models/user.model";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";

export const loginService = async ( email: string, password: string ) => {
    const user = await User.findOne({ email, deleted: false }).populate("roleID", "permissions");
    if (!user) {
        throw new AppError("Invalid Email!", 400);
    }
    if (user.accountType !== "admin") {
        throw new AppError("Your account is not admin account!", 400);
    }
    if (user.status !== "active") {
        throw new AppError("Your account has been locked!", 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError("Invalid Password!", 400);
    }
    
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        accountType: user.accountType,
        roleID: user.roleID,
        status: user.status
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);
    await User.findByIdAndUpdate(user._id, {
        refreshToken: newRefreshToken,
        refreshTokenExpiredAt:new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    return {
        message: "Đăng nhập thành công",
        newAccessToken,
        newRefreshToken,
        user: payload,
    };
};
export const registerService = async ( fullName: string, email: string, password: string, roleID: string ) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("Email already exists!", 400);
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        fullName,
        email,
        accountType: "admin",
        roleID: roleID,
        password: hashedPassword
    });
    await newUser.save();
    await newUser.populate("roleID", "permissions");

    const payload = {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        avatar: newUser.avatar,
        accountType: newUser.accountType,
        roleID: newUser.roleID,
        status: newUser.status
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);
    await User.findByIdAndUpdate(newUser._id, {
        refreshToken: newRefreshToken,
        refreshTokenExpiredAt:
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    return {
        message: "Đăng ký thành công",
        newAccessToken,
        newRefreshToken,
        user: payload
    };
};
export const refreshTokenService = async (refreshToken: string) => {
    if (!refreshToken) {
        throw new AppError("Refresh token missing", 401);
    }

    let decoded: any;
    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET as string
        );
    } catch (err) {
        throw new AppError("Invalid or expired refresh token", 401);
    }
    const user = await User.findById(decoded._id);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (user.refreshToken !== refreshToken) {
        throw new AppError("Refresh token revoked", 401);
    }
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        accountType: user.accountType,
        roleID: user.roleID,
        status: user.status
    };
    const newAccessToken = generateAccessToken(payload);
    return {
        accessToken: newAccessToken,
    };
};
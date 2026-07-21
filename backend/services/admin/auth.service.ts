import User from "../../models/user.model";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import { UpdateMeBody } from "../../validations/admin/auth.validation";

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
    if (!user.password) {
        throw new AppError( "This account does not support password login.", 400 );
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
export const logoutService = async (userID: string) => {
    const user = await User.updateOne({_id: userID},{refreshToken: null, refreshTokenExpiredAt: null});
    if(user.matchedCount == 0){
        throw new AppError("User not found", 404);
    }
    return {
        message: "Logout successfully!"
    }
};
export const updateMeService = async ( userID: string, body: UpdateMeBody ) => {
    if (body.email) {
        const existEmail = await User.findOne({ email: body.email, _id: { $ne: userID }, });
        if (existEmail) {
            throw new AppError("Email already exists", 409);
        }
    }

    if (body.password) {
        body.password = await bcrypt.hash(body.password, 10);
    }

    const result = await User.updateOne( { _id: userID }, { $set: body } );

    if (result.matchedCount === 0) {
        throw new AppError("User not found", 404);
    }

    return {
        message: "Updated profile successfully",
    };
};
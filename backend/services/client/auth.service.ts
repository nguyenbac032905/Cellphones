import { generateRandomNumber } from "../../helpers/generate";
import { sendMail } from "../../helpers/sendMail";
import Otp from "../../models/otp.model";
import User from "../../models/user.model";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";
import { RegisterBody, SetPasswordBody, VerifyBody } from "../../validations/client/auth.validation";
import { generateAccessToken, generateRefreshToken, generateRegisterToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import Cart from "../../models/cart.model";

interface RegisterTokenPayload extends jwt.JwtPayload {
    userId: string;
}

export const registerService = async (body: RegisterBody) => {
    const {email} = body;

    const existingUser = await User.exists({ email });

    if (existingUser) {
        throw new AppError("Email đã được sử dụng.", 400);
    }

    const code = generateRandomNumber(6);
    const hashedCode = await bcrypt.hash(code, 10);

    await Otp.findOneAndUpdate(
        {
            email,
            purpose: "register",
        },
        {
            otp: hashedCode,
            expireAt: new Date(Date.now() + 5 * 60 * 1000),
            attempts: 0,
        },
        {
            upsert: true,
            new: true,
        }
    );

    await sendMail({
        email,
        subject: "Xác thực đăng ký tài khoản SMEMBER",
        html: registerOtpTemplate(code),
    });

    return {
        message: "Mã OTP đã được gửi tới email của bạn.",
    };
};
export const verifyTokenService = async (body: VerifyBody) => {
    const { email, otp } = body;

    const otpInfo = await Otp.findOne({ email });

    if (!otpInfo) {
        throw new AppError("OTP has expired.", 400);
    }

    if (otpInfo.attempts >= 5) {
        throw new AppError( "Too many incorrect OTP attempts. Please request a new OTP.", 400 );
    }

    const isCorrect = await bcrypt.compare(otp, otpInfo.otp);

    if (!isCorrect) {
        await Otp.updateOne( { email }, { $inc: { attempts: 1 } } );
        throw new AppError("Incorrect OTP.", 400);
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new AppError("Email already exists.", 409);
    }

    const user = await User.create({ email, status: "pending", accountType: "user"});

    await Otp.deleteOne({ email });

    const registerToken = generateRegisterToken({
        userId: user._id,
    });

    return {
        message: "Verify successfully.",
        registerToken,
    };
};
export const setPasswordService = async ( body: SetPasswordBody, registerToken: string ) => {
    const { password, fullName } = body;

    const payload = jwt.verify( registerToken, process.env.REGISTER_SECRET! ) as RegisterTokenPayload;

    const user = await User.findById(payload.userId);

    if (!user) {
        throw new AppError("Invalid register token.", 401);
    }

    if (user.status !== "pending") {
        throw new AppError("Registration has already been completed.", 400);
    }

    if (user.password) {
        throw new AppError("Password has already been set.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.fullName = fullName;
    user.status = "active";

    await user.save();

    return {
        message: "Register successfully.",
    };
};
export const loginService = async ( email: string, password: string ) => {
    const user = await User.findOne({ email, deleted: false });
    if (!user) {
        throw new AppError("Invalid Email!", 400);
    }
    if (user.status !== "active") {
        throw new AppError("Your account has been locked!", 400);
    }
    if (!user.password) {
        throw new AppError( "No password has been set for this account. Please click 'Forgot Password' to set your password.", 400 );
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
        accountType: user.accountType
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);
    await User.findByIdAndUpdate(user._id, {
        refreshToken: newRefreshToken,
        refreshTokenExpiredAt:new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    await Cart.findOneAndUpdate(
        { userID: user._id },
        {},
        {
            upsert: true,
            setDefaultsOnInsert: true
        }
    );
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

const registerOtpTemplate = (otp: string) => ` <div style=" max-width:480px; margin:auto; padding:32px 24px; border:1px solid #e5e7eb; border-radius:12px; font-family:Arial,sans-serif; color:#333; " > <h2 style=" margin:0 0 20px; color:#d70018; text-align:center; " > Xác thực đăng ký SMEMBER </h2> <p>Xin chào,</p> <p> Đây là mã OTP để hoàn tất đăng ký tài khoản của bạn: </p> <div style=" margin:24px 0; padding:16px; background:#fff5f5; border-radius:8px; text-align:center; font-size:32px; font-weight:bold; letter-spacing:8px; color:#d70018; " > ${otp} </div> <p>Mã có hiệu lực trong <strong>5 phút</strong>.</p> <p style="color:#6b7280;font-size:14px;"> Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email. </p> <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" /> <p style=" margin:0; text-align:center; color:#9ca3af; font-size:13px; " > © SMEMBER </p> </div> `;
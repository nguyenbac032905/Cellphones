import bcrypt from "bcrypt";
import User from "../../models/user.model";
import { loginService,refreshTokenService,registerService } from "../../services/admin/auth.service";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";

jest.mock("../../models/user.model", () => ({
    __esModule: true,
    default: {
        findOne: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
    }
}));

jest.mock("bcrypt", () => ({
    compare: jest.fn(),
    hash: jest.fn()
}));

jest.mock("../../utils/jwt", () => ({
    generateAccessToken: jest.fn(),
    generateRefreshToken: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
    verify: jest.fn()
}));

const mockUser = {
    _id: "user-id",
    fullName: "Nguyen Van Bac",
    email: "admin@gmail.com",
    password: "hashed-password",
    phone: "0123456789",
    avatar: "avatar.png",
    accountType: "admin",
    roleID: "role-id",
    status: "active"
};
const dataUser = {
    _id: "user-id",
    fullName: "Nguyen Van Bac",
    email: "admin@gmail.com",
    phone: "0123456789",
    avatar: "avatar.png",
    accountType: "admin",
    roleID: "role-id",
    status: "active",
    refreshToken: "valid-refresh-token"
};
const expectedPayload = {
    _id: mockUser._id,
    fullName: mockUser.fullName,
    email: mockUser.email,
    phone: mockUser.phone,
    avatar: mockUser.avatar,
    accountType: mockUser.accountType,
    roleID: mockUser.roleID,
    status: mockUser.status
};
//test login service
describe("loginService", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.useFakeTimers().setSystemTime(
            new Date("2026-01-01T00:00:00Z")
        );
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe("validation", () => {
        // invalid email
        it("Khi email không tồn tại thì phải throw AppError 400", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await expect(
                loginService("admin@gmail.com", "123456")
            ).rejects.toMatchObject({
                message: "Invalid Email!",
                statusCode: 400
            });
            expect(User.findOne).toHaveBeenCalledWith({ email: "admin@gmail.com", deleted: false });

            expect(bcrypt.compare).not.toHaveBeenCalled();
            expect(generateAccessToken).not.toHaveBeenCalled();
            expect(generateRefreshToken).not.toHaveBeenCalled();
            expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
        });
        // accountType không phải admin
        it("Khi accountType không phải admin thì phải throw AppError 400", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ ...mockUser, accountType: "user" });

            await expect(
                loginService("admin@gmail.com", "123456")
            ).rejects.toMatchObject({
                message: "Your account is not admin account!",
                statusCode: 400
            });
            expect(User.findOne).toHaveBeenCalledWith({ email: "admin@gmail.com", deleted: false });

            expect(bcrypt.compare).not.toHaveBeenCalled();
            expect(generateAccessToken).not.toHaveBeenCalled();
            expect(generateRefreshToken).not.toHaveBeenCalled();
            expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
        });
        // account bị khóa
        it("Khi account bị khóa thì phải throw AppError 400", async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ ...mockUser, status: "inactive" });

            await expect(
                loginService("admin@gmail.com", "123456")
            ).rejects.toMatchObject({
                message: "Your account has been locked!",
                statusCode: 400
            });
            expect(User.findOne).toHaveBeenCalledWith({ email: "admin@gmail.com", deleted: false });

            expect(bcrypt.compare).not.toHaveBeenCalled();
            expect(generateAccessToken).not.toHaveBeenCalled();
            expect(generateRefreshToken).not.toHaveBeenCalled();
            expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
        });
    });
    describe("password", () => {
        // sai mật khẩu
        it("Khi mật khẩu sai thì phải throw AppError 400", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(
                loginService("admin@gmail.com", "123456")
            ).rejects.toMatchObject({
                message: "Invalid Password!",
                statusCode: 400
            });
            expect(User.findOne).toHaveBeenCalledWith({ email: "admin@gmail.com", deleted: false });
            expect(bcrypt.compare).toHaveBeenCalledWith( "123456", mockUser.password );

            expect(generateAccessToken).not.toHaveBeenCalled();
            expect(generateRefreshToken).not.toHaveBeenCalled();
            expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
        });

    });
    describe("success flow", () => {
        // login thành công
        it("Khi login thành công thì phải generate token, lưu refreshToken và return đúng dữ liệu", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (generateAccessToken as jest.Mock).mockReturnValue("access-token");
            (generateRefreshToken as jest.Mock).mockReturnValue("refresh-token");
            (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(true);

            const result = await loginService( "admin@gmail.com", "123456" );

            expect(User.findOne).toHaveBeenCalledWith({ email: "admin@gmail.com", deleted: false });
            // check compare password
            expect(bcrypt.compare).toHaveBeenCalledWith( "123456", mockUser.password );
            // check generate access token
            expect(generateAccessToken).toHaveBeenCalledWith( expectedPayload );
            // check generate refresh token
            expect(generateRefreshToken).toHaveBeenCalledWith( expectedPayload );

            // check lưu refresh token + expired đúng 30 ngày
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                mockUser._id,
                {
                    refreshToken: "refresh-token",
                    refreshTokenExpiredAt: new Date("2026-01-31T00:00:00Z")
                }
            );

            // check không leak dữ liệu nhạy cảm
            expect(result.user).not.toHaveProperty("password");
            expect(result.user).not.toHaveProperty("refreshToken");

            // check return value
            expect(result).toEqual({
                message: "Đăng nhập thành công",
                newAccessToken: "access-token",
                newRefreshToken: "refresh-token",
                user: expectedPayload
            });
        });
    });
});
//test register service
describe("registerService", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.useFakeTimers().setSystemTime(
            new Date("2026-01-01T00:00:00Z")
        );
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe("validation", () => {
        // email đã tồn tại
        it("Khi email đã tồn tại thì phải throw AppError 400", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);

            await expect(
                registerService(
                    "Nguyen Van Bac",
                    "admin@gmail.com",
                    "123456",
                    "role-id"
                )
            ).rejects.toMatchObject({
                message: "Email already exists!",
                statusCode: 400
            });

            expect(User.findOne).toHaveBeenCalledWith({ email: "admin@gmail.com" });

            expect(bcrypt.hash).not.toHaveBeenCalled();
            expect(User.create).not.toHaveBeenCalled();
            expect(generateAccessToken).not.toHaveBeenCalled();
            expect(generateRefreshToken).not.toHaveBeenCalled();
            expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
        });
    });
    describe("success flow", () => {
        // register thành công
        it("Khi register thành công thì phải hash password, create user, generate token và return đúng dữ liệu", async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            (bcrypt.hash as jest.Mock) .mockResolvedValue("hashed-password");
            (User.create as jest.Mock) .mockResolvedValue(mockUser);
            (generateAccessToken as jest.Mock) .mockReturnValue("access-token");
            (generateRefreshToken as jest.Mock) .mockReturnValue("refresh-token");
            (User.findByIdAndUpdate as jest.Mock) .mockResolvedValue(true);

            const result = await registerService( "Nguyen Van Bac", "admin@gmail.com", "123456", "role-id" );

            // check hash password
            expect(bcrypt.hash).toHaveBeenCalledWith( "123456", 10 );
            // check create user
            expect(User.create).toHaveBeenCalledWith({
                fullName: "Nguyen Van Bac",
                email: "admin@gmail.com",
                accountType: "admin",
                roleID: "role-id",
                password: "hashed-password"
            });
            // check generate access token
            expect(generateAccessToken).toHaveBeenCalledWith( expectedPayload );
            // check generate refresh token
            expect(generateRefreshToken).toHaveBeenCalledWith( expectedPayload );
            // check lưu refresh token + expired đúng 30 ngày
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                mockUser._id,
                {
                    refreshToken: "refresh-token",
                    refreshTokenExpiredAt: new Date("2026-01-31T00:00:00Z")
                }
            );

            // check không leak dữ liệu nhạy cảm
            expect(result.user).not.toHaveProperty("password");
            expect(result.user).not.toHaveProperty("refreshToken");
            // check return value
            expect(result).toEqual({
                message: "Đăng ký thành công",
                newAccessToken: "access-token",
                newRefreshToken: "refresh-token",
                user: expectedPayload
            });
        });
    });
});
// test refresh token service
describe("refreshTokenService", () => {
    const mockDecoded = {
        _id: "user-id"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("validation", () => {
        // thiếu refresh token
        it("Khi không gửi refreshToken thì phải throw AppError 401", async () => {
            await expect(
                refreshTokenService("")
            ).rejects.toMatchObject({
                message: "Refresh token missing",
                statusCode: 401
            });

            expect(jwt.verify).not.toHaveBeenCalled();
            expect(User.findById).not.toHaveBeenCalled();
            expect(generateAccessToken).not.toHaveBeenCalled();
        });
        // refresh token sai hoặc hết hạn
        it("Khi refreshToken sai hoặc hết hạn thì phải throw AppError 401", async () => {
            (jwt.verify as jest.Mock) .mockImplementation(() => { throw new Error("jwt expired"); });

            await expect(
                refreshTokenService("invalid-refresh-token")
            ).rejects.toMatchObject({
                message: "Invalid or expired refresh token",
                statusCode: 401
            });

            expect(jwt.verify).toHaveBeenCalledWith(
                "invalid-refresh-token",
                process.env.JWT_REFRESH_SECRET
            );

            expect(User.findById).not.toHaveBeenCalled();
            expect(generateAccessToken).not.toHaveBeenCalled();
        });
        // user không tồn tại
        it("Khi user không tồn tại thì phải throw AppError 404", async () => {
            (jwt.verify as jest.Mock) .mockReturnValue(mockDecoded);
            (User.findById as jest.Mock) .mockResolvedValue(null);

            await expect(
                refreshTokenService("valid-refresh-token")
            ).rejects.toMatchObject({
                message: "User not found",
                statusCode: 404
            });

            expect(User.findById).toHaveBeenCalledWith( mockDecoded._id );
            expect(generateAccessToken).not.toHaveBeenCalled();
        });
        // refresh token bị revoke
        it("Khi refreshToken không khớp thì phải throw AppError 401", async () => {
            (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);
            (User.findById as jest.Mock).mockResolvedValue({ ...dataUser, refreshToken: "another-refresh-token" });

            await expect(
                refreshTokenService("valid-refresh-token")
            ).rejects.toMatchObject({
                message: "Refresh token revoked",
                statusCode: 401
            });

            expect(generateAccessToken).not.toHaveBeenCalled();
        });

    });
    describe("success flow", () => {
        // refresh token thành công
        it("Khi refreshToken hợp lệ thì phải generate accessToken và return đúng dữ liệu", async () => {
            (jwt.verify as jest.Mock) .mockReturnValue(mockDecoded);
            (User.findById as jest.Mock) .mockResolvedValue(dataUser);
            (generateAccessToken as jest.Mock) .mockReturnValue("new-access-token");

            const result = await refreshTokenService( "valid-refresh-token" );

            // check verify token
            expect(jwt.verify).toHaveBeenCalledWith( "valid-refresh-token", process.env.JWT_REFRESH_SECRET );
            // check find user
            expect(User.findById).toHaveBeenCalledWith( mockDecoded._id );
            // check generate access token
            expect(generateAccessToken).toHaveBeenCalledWith( expectedPayload );
            // check return value
            expect(result).toEqual({ accessToken: "new-access-token" });
        });
    });
});
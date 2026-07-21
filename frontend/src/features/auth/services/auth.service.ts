import { publicClient } from "../../../shared/api/publicClient";
import type { MessageResponse } from "../../../shared/types/common.type";
import type { UserLoginResponse } from "../types/auth.types";
import type { LoginBody, RegisterBody, SetPasswordBody, VerifyOtpBody } from "../validations/auth.validation";
export const authService = {
    register: async (body: RegisterBody): Promise<MessageResponse> => {
        const res = await publicClient.post<MessageResponse>("/api/auth/register", body);
        return res.data;
    },
    verifyOtp: async (body: VerifyOtpBody): Promise<MessageResponse> => {
        const res = await publicClient.post<MessageResponse>("/api/auth/verify-otp", body);
        return res.data
    },
    setPassword: async (body: SetPasswordBody): Promise<MessageResponse> => {
        const res = await publicClient.post<MessageResponse>("/api/auth/set-password", body);
        return res.data
    },
    login: async (body: LoginBody): Promise<UserLoginResponse> => {
        const res = await publicClient.post<UserLoginResponse>("/api/auth/login",body);
        return res.data
    }
};
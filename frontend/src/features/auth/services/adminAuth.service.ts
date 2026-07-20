import { privateClient } from "../../../shared/api/privateClient";
import { publicClient } from "../../../shared/api/publicClient";
import type { MessageResponse } from "../../../shared/types/common.type";
import type { GetMeResponse, LoginResponse, User } from "../types/auth.types";
import type { RegisterBody, SetPasswordBody, UpdateMeBody, VerifyOtpBody } from "../validations/auth.validation";

export const adminAuthService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const res = await publicClient.post<LoginResponse>("/admin/api/auth/login",{email: email, password: password});
        return res.data
    },
    logout: async (): Promise<MessageResponse> => {
        const res = await privateClient.post<MessageResponse>("/admin/api/auth/logout");
        return res.data;
    },
    getMe: async (): Promise<GetMeResponse> => {
        const res = await privateClient.get<GetMeResponse>("/admin/api/auth/me");
        return res.data;
    },
    updateMe: async (body: UpdateMeBody): Promise<MessageResponse> => {
        const res = await privateClient.patch<MessageResponse>("/admin/api/auth/me", body);
        return res.data
    },
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
    }
};
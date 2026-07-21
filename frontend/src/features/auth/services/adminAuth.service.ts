import { privateAdmin } from "../../../shared/api/privateAdmin";
import { publicClient } from "../../../shared/api/publicClient";
import type { MessageResponse } from "../../../shared/types/common.type";
import type { AdminLoginResponse, GetAdminResponse } from "../types/auth.types";
import type { LoginBody, UpdateMeBody} from "../validations/auth.validation";

export const adminAuthService = {
    login: async (body: LoginBody): Promise<AdminLoginResponse> => {
        const res = await publicClient.post<AdminLoginResponse>("/admin/api/auth/login",body);
        return res.data
    },
    logout: async (): Promise<MessageResponse> => {
        const res = await privateAdmin.post<MessageResponse>("/admin/api/auth/logout");
        return res.data;
    },
    getMe: async (): Promise<GetAdminResponse> => {
        const res = await privateAdmin.get<GetAdminResponse>("/admin/api/auth/me");
        return res.data;
    },
    updateMe: async (body: UpdateMeBody): Promise<MessageResponse> => {
        const res = await privateAdmin.patch<MessageResponse>("/admin/api/auth/me", body);
        return res.data
    }
};
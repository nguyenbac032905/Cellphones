import { privateClient } from "../../../shared/api/privateClient";
import { publicClient } from "../../../shared/api/publicClient";
import type { MessageResponse } from "../../../shared/types/common.type";
import type { LoginResponse } from "../types/auth.types";

export const adminAuthService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const res = await publicClient.post<LoginResponse>("/admin/api/auth/login",{email: email, password: password});
        return res.data
    },
    logout: async (): Promise<MessageResponse> => {
        const res = await privateClient.post<MessageResponse>("/admin/api/auth/logout");
        return res.data;
    }
};
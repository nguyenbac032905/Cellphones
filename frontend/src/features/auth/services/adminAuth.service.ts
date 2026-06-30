import { publicClient } from "../../../shared/api/publicClient";
import type { LoginResponse } from "../types/auth.types";

export const adminAuthService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const res = await publicClient.post<LoginResponse>("/admin/api/auth/login",{email: email, password: password});
        return res.data
    }
};
import { privateClient } from "../../../shared/api/privateClient"
import type { GetRolesResponse } from "../types/role.type";

export const roleAdminService = {
    getAll: async (): Promise<GetRolesResponse> => {
        const res = await privateClient.get<GetRolesResponse>("/admin/api/roles");
        return res.data;
    }
};
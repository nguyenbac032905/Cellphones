import { privateClient } from "../../../shared/api/privateClient"
import type { MessageResponse } from "../../../shared/types/common.type";
import type { GetRolesResponse, PostRoleBody } from "../types/role.type";

export const roleAdminService = {
    getAll: async (): Promise<GetRolesResponse> => {
        const res = await privateClient.get<GetRolesResponse>("/admin/api/roles");
        return res.data;
    },
    create: async (role: PostRoleBody): Promise<MessageResponse> => {
        const res = await privateClient.post<MessageResponse>("/admin/api/roles", role);
        return res.data;
    }
};
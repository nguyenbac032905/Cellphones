import { privateClient } from "../../../shared/api/privateClient"
import type { MessageResponse } from "../../../shared/types/common.type";
import type { getRoleResponse, GetRolesResponse, PatchRoleBody, PostRoleBody } from "../types/role.type";

export const roleAdminService = {
    getAll: async (): Promise<GetRolesResponse> => {
        const res = await privateClient.get<GetRolesResponse>("/admin/api/roles");
        return res.data;
    },
    create: async (role: PostRoleBody): Promise<MessageResponse> => {
        const res = await privateClient.post<MessageResponse>("/admin/api/roles", role);
        return res.data;
    },
    update: async (roleID: string, role: PatchRoleBody): Promise<MessageResponse> => {
        const res = await privateClient.patch<MessageResponse>(`/admin/api/roles/${roleID}`, role);
        return res.data;
    },
    get: async (roleID: string): Promise<getRoleResponse> => {
        const res = await privateClient.get<getRoleResponse>(`/admin/api/roles/${roleID}`);
        return res.data;
    }
};
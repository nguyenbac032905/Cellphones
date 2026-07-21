import { privateAdmin } from "../../../shared/api/privateAdmin"
import type { MessageResponse } from "../../../shared/types/common.type";
import type { getRoleResponse, GetRolesResponse, PatchRoleBody, PostRoleBody } from "../types/role.type";

export const roleAdminService = {
    getAll: async (): Promise<GetRolesResponse> => {
        const res = await privateAdmin.get<GetRolesResponse>("/admin/api/roles");
        return res.data;
    },
    create: async (role: PostRoleBody): Promise<MessageResponse> => {
        const res = await privateAdmin.post<MessageResponse>("/admin/api/roles", role);
        return res.data;
    },
    update: async (roleID: string, role: PatchRoleBody): Promise<MessageResponse> => {
        const res = await privateAdmin.patch<MessageResponse>(`/admin/api/roles/${roleID}`, role);
        return res.data;
    },
    get: async (roleID: string): Promise<getRoleResponse> => {
        const res = await privateAdmin.get<getRoleResponse>(`/admin/api/roles/${roleID}`);
        return res.data;
    },
    delete: async (roleID: string): Promise<MessageResponse> => {
        const res = await privateAdmin.delete<MessageResponse>(`/admin/api/roles/${roleID}`);
        return res.data;
    },
};
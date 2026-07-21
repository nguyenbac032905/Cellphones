import { privateAdmin } from "../../../shared/api/privateAdmin";
import type { MessageResponse } from "../../../shared/types/common.type";
import type { UserDetailResponse, UserListResponse, UserQuery } from "../types/users.type";
import type { CreateUserBody, UpdateUserBody } from "../validations/user.validation";

export const userAdminService = {
    getAll: async (query: UserQuery): Promise<UserListResponse> => {
        const res = await privateAdmin.get<UserListResponse>("/admin/api/users", {params: query});
        return res.data;
    },
    create: async (body: CreateUserBody): Promise<MessageResponse> => {
        const res = await privateAdmin.post<MessageResponse>("/admin/api/users", body);
        return res.data;
    },
    getOne: async (userID: string): Promise<UserDetailResponse> => {
        const res = await privateAdmin.get<UserDetailResponse>(`/admin/api/users/${userID}`);
        return res.data;
    },
    update: async (userID: string,body: UpdateUserBody): Promise<MessageResponse> => {
        const res = await privateAdmin.patch<MessageResponse>(`/admin/api/users/${userID}`, body);
        return res.data;
    },
    delete: async (userID: string): Promise<MessageResponse> => {
        const res = await privateAdmin.delete<MessageResponse>(`/admin/api/users/${userID}`);
        return res.data;
    }
}
import { privateClient } from "../../../shared/api/privateClient";
import type { MessageResponse } from "../../../shared/types/common.type";
import type { UserListResponse, UserQuery } from "../types/users.type";
import type { CreateUserBody } from "../validations/user.validation";

export const userAdminService = {
    getAll: async (query: UserQuery): Promise<UserListResponse> => {
        const res = await privateClient.get<UserListResponse>("/admin/api/users", {params: query});
        return res.data;
    },
    create: async (body: CreateUserBody): Promise<MessageResponse> => {
        const res = await privateClient.post<MessageResponse>("/admin/api/users", body);
        return res.data
    }
}
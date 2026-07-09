import { privateClient } from "../../../shared/api/privateClient";
import type { UserListResponse, UserQuery } from "../types/users.type";

export const userAdminService = {
    getAll: async (query: UserQuery): Promise<UserListResponse> => {
        const res = await privateClient.get<UserListResponse>("/admin/api/users", {params: query});
        return res.data;
    }
}
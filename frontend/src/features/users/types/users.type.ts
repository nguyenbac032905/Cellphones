import type { ApiResponse, PaginationMeta } from "../../../shared/types/common.type";

export interface UserQuery {
    status?: string;
    accountType?: string;
    search?: string;
    page?: number;
    limit?: number;
}

interface UserRole {
    _id: string;
    title: string;
}

export interface UserListItem {
    _id: string;
    fullName: string;
    email: string;
    avatar: string | null;
    accountType: "admin" | "user";
    roleID: UserRole;
    status: "active" | "inactive";
}

export type UserListResponse = ApiResponse<UserListItem[]> & {
    meta: PaginationMeta;
};
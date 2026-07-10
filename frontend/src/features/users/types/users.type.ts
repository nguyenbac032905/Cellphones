import type { ApiResponse, PaginationMeta } from "../../../shared/types/common.type";

export interface UserQuery {
    status?: string;
    accountType?: string;
    search?: string;
    page?: number;
    limit?: number;
};

interface UserRole {
    _id: string;
    title: string;
};

export interface UserListItem {
    _id: string;
    fullName: string;
    email: string;
    avatar: string | null;
    accountType: "admin" | "user";
    roleID: UserRole;
    status: "active" | "inactive";
};

export interface UserDetail {
    _id: string;
    fullName: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    accountType: "admin" | "user";
    roleID: UserRole;
    status: "active" | "inactive";
    deleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
};

export type UserListResponse = ApiResponse<UserListItem[]> & {
    meta: PaginationMeta;
};

export type UserDetailResponse = ApiResponse<UserDetail>;
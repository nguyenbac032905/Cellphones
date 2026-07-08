import z from "zod";
import { createRoleSchema, updateRoleSchema } from "../validations/role.validation";

export interface Role {
    _id: string;
    title: string;
    description: string;
    permissions: string[];
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
};

export type PostRoleBody = z.infer<typeof createRoleSchema>;
export type PatchRoleBody = z.infer<typeof updateRoleSchema>;

export interface GetRolesResponse {
    success: boolean;
    data: Role[];
};
export interface getRoleResponse {
    success: boolean;
    data: Role;
};
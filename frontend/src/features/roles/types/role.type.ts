import z from "zod";
import { createRoleSchema } from "../validations/role.validation";

export interface Role {
    _id: string;
    title: string;
    description: string;
    permissions: string[];
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export type PostRoleBody = z.infer<typeof createRoleSchema>;

export interface GetRolesResponse {
    success: boolean;
    data: Role[];
}
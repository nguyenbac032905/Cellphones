export interface Role {
    _id: string;
    title: string;
    description: string;
    permissions: string[];
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetRolesResponse {
    success: boolean;
    data: Role[];
}
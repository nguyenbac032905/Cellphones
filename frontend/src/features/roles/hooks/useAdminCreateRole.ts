import { useState } from "react";
import { roleAdminService } from "../services/roleAdmin.service";
import type { PostRoleBody } from "../types/role.type";

export const useAdminCreateRole = () => {
    const [loading, setLoading] = useState(false);

    const createRole = async (role: PostRoleBody) => {
        try {
            setLoading(true);

            const result = await roleAdminService.create(role);

            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, createRole };
};
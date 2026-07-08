import { useState } from "react";
import { roleAdminService } from "../services/roleAdmin.service";
import type { PatchRoleBody } from "../types/role.type";
export const useAdminUpdateRole = () => {
    const [loading, setLoading] = useState(false);

    const updateRole = async (roleID: string, role: PatchRoleBody) => {
        try {
            setLoading(true);

            const result = await roleAdminService.update(roleID,role);

            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateRole };
};
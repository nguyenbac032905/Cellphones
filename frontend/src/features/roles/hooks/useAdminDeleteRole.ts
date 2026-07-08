import { useState } from "react";
import { roleAdminService } from "../services/roleAdmin.service";
export const useAdminDeleteRole = () => {
    const [deletingRoleID, setDeletingRoleID] = useState("");

    const deleteRole = async (roleID: string) => {
        try {
            setDeletingRoleID(roleID);

            const result = await roleAdminService.delete(roleID);

            return result;
        } finally {
            setDeletingRoleID("");
        }
    };

    return { deletingRoleID, deleteRole };
};
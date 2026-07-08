import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { Role } from "../types/role.type";
import { roleAdminService } from "../services/roleAdmin.service";

export const useAdminRole = (roleID?: string) => {
    const [role, setRole] = useState<Role>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if(!roleID) return;
                
                setLoading(true);
                setError("");

                const result = await roleAdminService.get(roleID);
                
                setRole(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [roleID]);
    return {role, loading, error};
};
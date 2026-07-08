import { useCallback, useEffect, useState } from "react";
import { roleAdminService } from "../services/roleAdmin.service";
import type {Role} from "../types/role.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

export const useAdminRoles = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const fetchRoles = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await roleAdminService.getAll();

            if (res.success) {
                setRoles(res.data);
            }
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    return {
        roles,
        loading,
        error,
        refetch: fetchRoles
    };
};
import { useCallback, useEffect, useState } from "react";
import type { UserListItem, UserQuery } from "../types/users.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { PaginationMeta } from "../../../shared/types/common.type";
import { userAdminService } from "../services/usersAdmin.service";

export const useAdminUsers = (query: UserQuery) => {
    const [users, setUsers] = useState<UserListItem[]>([]);
    const [meta, setMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 4,
        totalPages: 0,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await userAdminService.getAll(query);

            if (res.success) {
                setUsers(res.data);
                setMeta(res.meta);
            }
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, [
        query.status,
        query.accountType,
        query.search,
        query.page,
        query.limit
    ]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        meta,
        loading,
        error,
        refetch: fetchUsers,
    };
};
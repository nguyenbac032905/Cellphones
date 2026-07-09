import { useSearchParams } from "react-router-dom";
import type { UserQuery } from "../types/users.type";

export const useAdminUserQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query: UserQuery = {
        status: searchParams.get("status") || undefined,
        accountType: searchParams.get("accountType") || undefined,
        search: searchParams.get("search") || undefined,
        page: Number(searchParams.get("page")) || undefined,
        limit: Number(searchParams.get("limit")) || undefined
    };

    const updateQuery = (values: Partial<UserQuery>) => {
        const params = new URLSearchParams(searchParams);

        Object.entries(values).forEach(([key, value]) => {
            if (value === undefined || value === "" || value === null) {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });

        setSearchParams(params);
    };

    return { query, updateQuery };
};
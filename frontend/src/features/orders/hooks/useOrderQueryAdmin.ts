import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { OrderQuery } from "../types/orderAdmin.type";

export const useOrderQueryAdmin = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = useMemo<OrderQuery>(() => ({
        orderStatus: (searchParams.get("orderStatus") as OrderQuery["orderStatus"]) || undefined,
        fromDate: searchParams.get("fromDate") || undefined,
        toDate: searchParams.get("toDate") || undefined,
        sort: (searchParams.get("sort") as OrderQuery["sort"]) || undefined,
        page: searchParams.get("page") || undefined,
        limit: searchParams.get("limit") || undefined,
    }), [searchParams]);

    const updateQuery = (values: Partial<OrderQuery>) => {
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

    const replaceQuery = (values: Partial<OrderQuery>) => {
        const params = new URLSearchParams();

        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined && value !== "" && value !== null) {
                params.set(key, String(value));
            }
        });

        setSearchParams(params);
    };

    return {
        query,
        updateQuery,
        replaceQuery,
    };
};
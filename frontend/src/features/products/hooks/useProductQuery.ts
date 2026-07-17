import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ProductClientQuery } from "../types/products.type";

export const useProductQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = useMemo<ProductClientQuery>(() => ({
        featured: searchParams.get("featured") as "true" | "false" | null ?? undefined,
        discount: searchParams.get("discount") || undefined,
        minPrice: searchParams.get("minPrice") || undefined,
        maxPrice: searchParams.get("maxPrice") || undefined,
        search: searchParams.get("search") || undefined,
        sort: (searchParams.get("sort") as ProductClientQuery["sort"]) || undefined,
        page: searchParams.get("page") || undefined,
        limit: searchParams.get("limit") || undefined,
    }), [searchParams]);

    const updateQuery = (values: Partial<ProductClientQuery>) => {
        const params = new URLSearchParams(searchParams);

        Object.entries(values).forEach(([key, value]) => {
            if (value === undefined || value === "" || value === null) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        setSearchParams(params);
    };

    const replaceQuery = (values: Partial<ProductClientQuery>) => {
        const params = new URLSearchParams();

        Object.entries(values).forEach(([key, value]) => {
            if (value != null && value !== "") {
                params.set(key, value);
            }
        });

        setSearchParams(params);
    };

    return { query, updateQuery, replaceQuery };
};
import { useSearchParams } from "react-router-dom"
import type { ProductQuery } from "../types/products.type";

export const useAdminProductQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query:ProductQuery = {
        status: searchParams.get("status") || undefined,
        category: searchParams.get("category") || undefined,
        stock: searchParams.get("stock") || undefined,
        search: searchParams.get("search") || undefined,
        sort: searchParams.get("sort") || undefined,
        page: Number(searchParams.get("page")) || undefined,
        limit: Number(searchParams.get("limit")) || undefined
    }

    const updateQuery = (values: Partial<ProductQuery>) => {
        const params = new URLSearchParams(searchParams);

        Object.entries(values).forEach(([key,value]) => {
            if(value === undefined || value === "" || value === null){
                params.delete(key);
            }else{
                params.set(key,String(value));
            }
        })
        setSearchParams(params);
    }

    return {query, updateQuery}
}
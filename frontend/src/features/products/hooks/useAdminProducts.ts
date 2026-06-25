import { useEffect, useState } from "react";
import { productAdminService } from "../services/productAdmin.service";
import type {ProductListResponse, ProductQuery} from "../types/products.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
export const useAdminProducts = (query: ProductQuery) => {
    const [data, setData] = useState<ProductListResponse>({
        products: [],
        pagination: {
            total: 0,
            page: 1,
            limit: 1,
            totalPages: 0,
        },
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await productAdminService.getAll(query);

                setData(data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [query.status, query.category,query.search,query.sort,query.page,query.limit, query.stock]);

    return {data,loading,error};
};
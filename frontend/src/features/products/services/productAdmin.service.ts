import { publicClient } from "../../../shared/api/publicClient";
import type {
    PatchProductBody,
    PostProductBody,
    Product,
    ProductListResponse,
    ProductQuery
} from "../types/products.type";

export const productAdminService = {
    getAll: async (
        query: ProductQuery
    ): Promise<ProductListResponse> => {
        const res = await publicClient.get<ProductListResponse>(
            "/admin/api/products",
            { params: query }
        );

        return {
            pagination: res.data.pagination,
            products: res.data.products
        };
    },
    get: async (productID: string): Promise<Product> => {
        const res = await publicClient.get<Product>(`/admin/api/products/${productID}`);
        return res.data;
    },
    update: async (
        product: PatchProductBody,
        productID: string
    ): Promise<Product> => {
        const res = await publicClient.patch<Product>(
            `/admin/api/products/${productID}`,
            product
        );

        return res.data;
    },
    delete: async (
        productID: string
    ): Promise<Product> => {
        const res = await publicClient.delete<Product>(
            `/admin/api/products/${productID}`
        );

        return res.data;
    },
    create: async (
        product: PostProductBody
    ): Promise<Product> => {
        const res = await publicClient.post<Product>(
            `/admin/api/products`,
            product
        );

        return res.data;
    }
};
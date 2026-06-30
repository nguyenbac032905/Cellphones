import { privateClient } from "../../../shared/api/privateClient";
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
        const res = await privateClient.get<ProductListResponse>(
            "/admin/api/products",
            { params: query }
        );

        return {
            pagination: res.data.pagination,
            products: res.data.products
        };
    },
    get: async (productID: string): Promise<Product> => {
        const res = await privateClient.get<Product>(`/admin/api/products/${productID}`);
        return res.data;
    },
    update: async (
        product: PatchProductBody,
        productID: string
    ): Promise<Product> => {
        const res = await privateClient.patch<Product>(
            `/admin/api/products/${productID}`,
            product
        );

        return res.data;
    },
    delete: async (
        productID: string
    ): Promise<Product> => {
        const res = await privateClient.delete<Product>(
            `/admin/api/products/${productID}`
        );

        return res.data;
    },
    create: async (
        product: PostProductBody
    ): Promise<Product> => {
        const res = await privateClient.post<Product>(
            `/admin/api/products`,
            product
        );

        return res.data;
    }
};
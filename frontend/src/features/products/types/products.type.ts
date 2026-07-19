import z from "zod";
import { createProductSchema, imageSchema, updateProductSchema } from "../validations/product.validation";
import type { ApiResponse, PaginationMeta } from "../../../shared/types/common.type";

export type ProductImage = z.infer<typeof imageSchema>;
export type PatchProductBody = z.infer<typeof updateProductSchema>;
export type PostProductBody = z.infer<typeof createProductSchema>;

export interface ProductQuery{
    status?: string;
    stock?: string;
    category?: string;
    sort?: string;
    search?: string;
    page?: number;
    limit?: number;
};

interface Category {
    _id: string;
    title: string;
};

export interface Product {
    _id: string;
    title: string;
    product_category_id?: Category | null;
    description: string;
    content: string;
    price: number;
    discountPercentage: number;
    stock: number;
    sold: number;
    images: ProductImage[];
    status: "active" | "inactive";
    position: number;
    featured: boolean;
    slug: string;
    deleted: boolean;
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ProductListItem {
    _id: string;
    title: string;
    price: number;
    stock: number;
    status: "active" | "inactive";
    position: number;
    category: Category | null;
    mainImage: string | null;
}

export type ProductListResponse = ApiResponse<ProductListItem[]> & {
    meta: PaginationMeta;
};
export type ProductResponse = ApiResponse<Product>;
// client
export interface ProductListClient {
    _id?: string;
    title: string;
    slug: string;
    featured: boolean;
    mainImage: string;
    price: number;
    discountPercentage: number
    sold?: string;
    createdAt?: string;
}

export type ProductListClientResponse = ApiResponse<ProductListClient[]> & {
    meta: PaginationMeta;
};

export interface ProductClientQuery {
    featured?: "true" | "false";
    discount?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    sort?: "newest" | "price-asc" | "price-desc" | "discount-desc";
    page?: string;
    limit?: string;
}
//detail
export type ProductDetailClient = {
    _id: string;
    title: string;
    slug: string;
    product_category_id: {
        _id: string;
        title: string;
        slug: string;
    };
    description: string;
    content: string;
    price: number;
    discountPercentage: number;
    stock: number;
    sold: number;
    featured: boolean;
    images: {
        _id: string;
        url: string;
        isMain: boolean;
    }[];
};

export type ProductDetailClientResponse = ApiResponse<ProductDetailClient>;
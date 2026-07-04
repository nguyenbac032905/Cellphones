import z from "zod";
import { createProductSchema, imageSchema, updateProductSchema } from "../validations/product.validation";

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

export interface Category {
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


export type PaginationMeta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
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
export type ProductListResponse = {
    success: boolean;
    data: ProductListItem[];
    meta: PaginationMeta;
};

export type MessageResponse = {
    success: boolean;
    message: string;
};
export type ProductResponse = {
    success: boolean;
    data: Product;
};
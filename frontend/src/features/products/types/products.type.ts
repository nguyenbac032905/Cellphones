import z from "zod";
import { createProductSchema, imageSchema, updateProductSchema } from "../validations/product.validation";

export type ProductImage = z.infer<typeof imageSchema>;
export type PatchProductBody = z.infer<typeof updateProductSchema>;
export type PostProductBody = z.infer<typeof createProductSchema>;

export interface Category {
    _id: string;
    title?: string;
}
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

export type ProductListResponse = {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export interface ProductQuery{
    status?: string;
    stock?: string;
    category?: string;
    sort?: string;
    search?: string;
    page?: number;
    limit?: number;
};
export interface ProductImage {
    url: string;
    isMain?: boolean;
}
export interface ProductDeleted {
    _id: string;
    title: string;
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
export interface ProductDeletedResponse {
    success: boolean;
    data: ProductDeleted[];
}
export interface BaseProductResponse {
    success: boolean;
    message: string;
}
export interface Product {
    id?: string;
    _id: string;
    title: string;
    product_category_id?: string | null;
    description: string;
    content: string;
    price: number;
    discountPercentage: number;
    stock: number;
    sold: number;
    thumbnail: string;
    images: string[];
    status: "active" | "inactive";
    position: number;
    featured: boolean;
    slug: string;
    deleted: boolean;
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
}
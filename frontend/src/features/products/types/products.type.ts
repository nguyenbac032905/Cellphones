export interface Product {
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

export interface PatchProductBody {
    title?: string;
    product_category_id?: string | null;
    description?: string;
    content?: string;
    price?: number;
    discountPercentage?: number;
    stock?: number;
    thumbnail?: string;
    images?: string[];
    status?: "active" | "inactive";
    position?: number;
    featured?: boolean;
}
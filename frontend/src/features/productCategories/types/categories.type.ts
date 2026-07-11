import type { ApiResponse, PaginationMeta } from "../../../shared/types/common.type";

export interface ProductCategory  {
    _id: string;
    title: string;
    parent_id: string | null;
    description: string;
    thumbnail: string;
    status: "active" | "inactive";
    position: number;
    slug: string;
    deleted: boolean;
    deletedAt?: string;
    createdAt: string;
    updatedAt: string;
};
export type CategoryTree = ProductCategory & {
    children: CategoryTree[];
};
export type CategoryTreeResponse = {
    success: boolean;
    data: CategoryTree[];
};

export interface ProductCategoryQuery{
    status?: string;
    category?: string;
    sort?: string;
    search?: string;
    page?: number;
    limit?: number;
};
export interface CategoryListItem {
    _id: string;
    title: string;
    parent_id: string | null;
    status: "active" | "inactive";
    position: number;
    thumbnail: string;
    parentTitle: string;
};

export type CategoryListResponse = ApiResponse<CategoryListItem[]> & {
    meta: PaginationMeta
}
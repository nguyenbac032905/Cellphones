export type ProductCategory = {
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

export type CategoryTreeResponse = CategoryTree[];
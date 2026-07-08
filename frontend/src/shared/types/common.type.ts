
export type MessageResponse = {
    success: boolean;
    message: string;
};
export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export type PaginationMeta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
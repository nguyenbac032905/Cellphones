import type { ApiResponse } from "../../../shared/types/common.type";

export interface Branch {
    _id: string;
    name: string;
    address: string;
    phone?: string;
}

export type BranchListResponse = ApiResponse<Branch[]>;

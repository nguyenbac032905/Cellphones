import { publicClient } from "../../../shared/api/publicClient";
import type { BranchListResponse } from "../types/branch.type";

export const branchService = {
    getAll: async (): Promise<BranchListResponse> => {
        const res = await publicClient.get<BranchListResponse>("/api/branches");
        return res.data;
    }
};

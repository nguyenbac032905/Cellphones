import { Request } from "express";
import { BRANCH_HEADER, DEFAULT_BRANCH_ID } from "../constants/branch";

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

// Lấy branchId từ header x-branch-id, thiếu hoặc không hợp lệ thì dùng chi nhánh mặc định (Hà Nội)
export const getBranchId = (req: Request): string => {
    const raw = req.headers[BRANCH_HEADER];
    const value = Array.isArray(raw) ? raw[0] : raw;

    if (value && OBJECT_ID_REGEX.test(value)) {
        return value;
    }

    return DEFAULT_BRANCH_ID;
};

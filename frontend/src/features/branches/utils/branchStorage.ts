// Chi nhánh mặc định: Hà Nội (trùng với DEFAULT_BRANCH_ID ở backend)
export const DEFAULT_BRANCH_ID = "6adbccf849367b92c7ab4e0a";
export const BRANCH_HEADER = "x-branch-id";

const STORAGE_KEY = "selectedBranchId";

export const getStoredBranchId = (): string => {
    try {
        return localStorage.getItem(STORAGE_KEY) || DEFAULT_BRANCH_ID;
    } catch {
        return DEFAULT_BRANCH_ID;
    }
};

export const setStoredBranchId = (branchId: string) => {
    try {
        localStorage.setItem(STORAGE_KEY, branchId);
    } catch {
        // bỏ qua nếu trình duyệt chặn localStorage
    }
};

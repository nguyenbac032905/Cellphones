import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { branchService } from "../services/branch.service";
import { setBranchesReducer, setBranchIdReducer } from "../branch.slice";
import { DEFAULT_BRANCH_ID, setStoredBranchId } from "../utils/branchStorage";

// autoFetch = true chỉ dùng ở nơi hiển thị dropdown (header) để nạp danh sách chi nhánh 1 lần
export const useBranches = (autoFetch = false) => {
    const dispatch = useAppDispatch();
    const branches = useAppSelector((state) => state.branch.branches);
    const branchId = useAppSelector((state) => state.branch.branchId);

    const selectBranch = useCallback(
        (id: string) => {
            // Ghi storage trước để request kế tiếp (do branchId đổi kích hoạt) đã lấy đúng header
            setStoredBranchId(id);
            dispatch(setBranchIdReducer(id));
        },
        [dispatch]
    );

    useEffect(() => {
        if (!autoFetch) return;

        const fetchBranches = async () => {
            try {
                const res = await branchService.getAll();
                if (!res.success) return;

                dispatch(setBranchesReducer(res.data));

                // Chi nhánh đã lưu không còn tồn tại thì quay về mặc định (Hà Nội)
                const exists = res.data.some((item) => item._id === branchId);
                if (!exists) {
                    setStoredBranchId(DEFAULT_BRANCH_ID);
                    dispatch(setBranchIdReducer(DEFAULT_BRANCH_ID));
                }
            } catch {
                // lỗi mạng: giữ nguyên chi nhánh hiện tại
            }
        };

        fetchBranches();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoFetch, dispatch]);

    const selectedBranch = branches.find((item) => item._id === branchId);

    return { branches, branchId, selectedBranch, selectBranch };
};

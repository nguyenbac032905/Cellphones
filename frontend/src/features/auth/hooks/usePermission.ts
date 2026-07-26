import { useCallback, useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";

export const usePermission = () => {
    const user = useAppSelector((state) => state.auth.user);

    // Lấy danh sách permissions và cache lại với useMemo
    const permissions = useMemo(() => {
        if (user && user.accountType === "admin") {
            return user.roleID?.permissions ?? [];
        }
        return [];
    }, [user]);

    // Hàm kiểm tra quyền
    const can = useCallback(
        (permission: string) => permissions.includes(permission),
        [permissions]
    );

    return can;
};
import { useCallback } from "react";
import { useAppSelector } from "../../../app/hooks";

export const usePermission = () => {
    const permissions = useAppSelector((state) => state.auth.user?.roleID?.permissions) ?? [];
    
    const can = useCallback(
        (permission: string) => permissions.includes(permission),
        [permissions]
    );

    return can;
};
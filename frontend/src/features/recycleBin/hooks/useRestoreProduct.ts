import { useCallback, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { recycleBinAdminService } from "../services/recycleBinAdmin.service";

export const useRestoreProduct = () => {
    const [error, setError] = useState("");

    const restoreProduct = useCallback(async (productID: string) => {
        try {
            setError("");

            const result = await recycleBinAdminService.restoreProduct(productID);
            return result;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
        }
    }, []);
    return {
        restoreProduct,
        error
    };
};
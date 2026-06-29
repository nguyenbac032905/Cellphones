import { useCallback, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { recycleBinAdminService } from "../services/recycleBinAdmin.service";

export const useForceProduct = () => {
    const [error, setError] = useState("");

    const forceProduct = useCallback(async (productID: string) => {
        try {
            setError("");

            const result = await recycleBinAdminService.forceProduct(productID);
            return result;
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
        }
    }, []);
    return {
        forceProduct,
        error
    };
};
import { useCallback, useState } from "react";
import { recycleBinAdminService } from "../services/recycleBinAdmin.service";

export const useRestoreProduct = () => {
    const [loadingId, setLoadingId] = useState("");

    const restoreProduct = useCallback(async (productID: string) => {
        try {
            setLoadingId(productID);

            const result = await recycleBinAdminService.restoreProduct(productID);

            return result;
        } finally {
            setLoadingId("");
        }
    }, []);

    return { restoreProduct, loadingId };
};
import { useCallback, useState } from "react";
import { recycleBinAdminService } from "../services/recycleBinAdmin.service";

export const useForceProduct = () => {
    const [loadingId, setLoadingId] = useState("");
    const forceProduct = useCallback(async (productID: string) => {
        try {
            setLoadingId(productID);

            const result = await recycleBinAdminService.forceProduct(productID);

            return result;
        } finally {
            setLoadingId("");
        }
    }, []);

    return { forceProduct, loadingId };
};
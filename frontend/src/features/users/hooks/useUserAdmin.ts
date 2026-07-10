import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { UserDetail } from "../types/users.type";
import { userAdminService } from "../services/usersAdmin.service";

export const useUserAdmin = (userID?: string) => {
    const [user, setUser] = useState<UserDetail>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if(!userID) return;
                
                setLoading(true);
                setError("");

                const result = await userAdminService.getOne(userID);
                
                setUser(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [userID]);
    return {user, loading, error};
};
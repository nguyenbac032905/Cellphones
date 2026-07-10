import { useState } from "react";
import { userAdminService } from "../services/usersAdmin.service";
import type { UpdateUserBody } from "../validations/user.validation";

export const useUpdateUserAdmin = () => {
    const [loading, setLoading] = useState(false);

    const updateUser = async (userID: string, body: UpdateUserBody) => {
        try {
            setLoading(true);

            const result = await userAdminService.update(userID, body);

            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateUser };
};
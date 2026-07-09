import { useState } from "react";
import type { CreateUserBody } from "../validations/user.validation";
import { userAdminService } from "../services/usersAdmin.service";

export const useCreateUserAdmin = () => {
    const [loading, setLoading] = useState(false);

    const createUser = async (body: CreateUserBody) => {
        try {
            setLoading(true);

            const result = await userAdminService.create(body);

            return result;
        } finally {
            setLoading(false);
        }
    };

    return { loading, createUser };
};
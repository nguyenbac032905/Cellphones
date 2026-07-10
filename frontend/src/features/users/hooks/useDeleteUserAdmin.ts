import { useState } from "react";
import { userAdminService } from "../services/usersAdmin.service";
export const useDeleteUserAdmin = () => {
    const [deletingID, setDeletingID] = useState("");

    const deleteUser = async (userID: string) => {
        try {
            setDeletingID(userID);

            const result = await userAdminService.delete(userID);

            return result;
        } finally {
            setDeletingID("");
        }
    };

    return { deletingID, deleteUser };
};
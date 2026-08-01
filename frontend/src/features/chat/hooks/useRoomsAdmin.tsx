import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { RoomAdmin } from "../types/chatAdmin.type";
import { chatAdminService } from "../services/chatAdmin.service";

export const useRoomsAdmin = () => {
    const [rooms, setRooms] = useState<RoomAdmin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const fetchApi = useCallback(async () => {
        try {
            setError("");

            const res = await chatAdminService.getRooms();

            if (res.success) {
                setRooms(res.data);
            }
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    return {
        rooms,
        setRooms: setRooms,
        loading,
        error
    };
};
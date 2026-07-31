import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import type { Room } from "../types/chat.type";
import { chatService } from "../services/chat.service";
export const useRoom = () => {
    const [room, setRoom] = useState<Room|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setError("");

                const result = await chatService.getRoom();
                
                setRoom(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);
    return {room, loading, error};
};
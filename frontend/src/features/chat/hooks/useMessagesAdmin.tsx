import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { chatAdminService } from "../services/chatAdmin.service";
import type { IChatMessage } from "../types/chatAdmin.type";

export const useMessagesAdmin = (roomID: string) => {
    const [messages, setMessages] = useState<IChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(!roomID) return;
        const fetchApi = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await chatAdminService.getMessages(roomID);
                setMessages(result.data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [roomID]);
    return {messages,setMessages: setMessages, loading, error};
};
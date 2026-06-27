import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return (
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Unknown error"
        );
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "Unknown error";
};
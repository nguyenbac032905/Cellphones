import { useState } from "react";
import type { CreateOrderBody } from "../validations/order.validation";
import { orderService } from "../services/order.service";

export const useCreateOrder = () => {
    const [loading, setLoading] = useState(false);

    const createOrder = async (body: CreateOrderBody) => {
        setLoading(true);

        try {
            const result = await orderService.create(body);
            return result.data;
        } finally {
            setLoading(false);
        }
    };

    return { loading, createOrder, };
};
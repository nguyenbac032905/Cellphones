import { privateClient } from "../../../shared/api/privateClient"
import type { DistrictsResponse, FeeResponse, ProvincesResponse, ShippingFeeBody, WardResponse } from "../types/checkout.type"

export const checkoutService = {
    getProvinces: async (): Promise<ProvincesResponse> => {
        const result = await privateClient.get<ProvincesResponse>("/api/shipping/provinces");
        return result.data
    },
    getDistricts: async (provinceID: number): Promise<DistrictsResponse> => {
        const result = await privateClient.get<DistrictsResponse>(`/api/shipping/districts/${provinceID}`);
        return result.data
    },
    getWards: async (districtID: number): Promise<WardResponse> => {
        const result = await privateClient.get<WardResponse>(`/api/shipping/wards/${districtID}`);
        return result.data
    },
    getFee: async (body: ShippingFeeBody): Promise<FeeResponse> => {
        const result = await privateClient.post<FeeResponse>("/api/shipping/fee", body);
        return result.data
    }
}
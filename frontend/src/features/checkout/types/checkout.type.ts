import type { ApiResponse } from "../../../shared/types/common.type";

export interface Province {
    ProvinceID: number;
    ProvinceName: string;
}
export type ProvincesResponse = ApiResponse<Province[]>;

export interface District {
    DistrictID: number,
    DistrictName: string,
}
export type DistrictsResponse = ApiResponse<District[]>;

export interface Ward {
    WardCode: string,
    WardName: string,
}
export type WardResponse = ApiResponse<Ward[]>;

export interface Fee {
    total: number
}
export type FeeResponse = ApiResponse<Fee>;

export interface ShippingFeeBody {
    fromDistrictId: number;
    fromWardCode: string;
    toDistrictId: number;
    toWardCode: string;
    height: number;
    width: number;
    length: number;
    weight: number;
    insuranceValue: number;
}
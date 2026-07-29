import { useState } from "react";
import type { FormInstance } from "antd";
import { useProvinces } from "./useProvinces";
import { useDistricts } from "./useDistricts";
import { useWards } from "./useWard";
import type { District, Fee, Province, ShippingFeeBody, Ward, } from "../types/checkout.type";

interface UseCheckoutAddressProps {
    form: FormInstance;
    getFee: (payload: ShippingFeeBody) => Promise<Fee | null>;
}

export const useCheckoutAddress = ({ form, getFee, }: UseCheckoutAddressProps) => {
    const { provinces } = useProvinces();
    const { districts, getDistricts } = useDistricts();
    const { wards, getWards } = useWards();

    const [selectedProvince, setSelectedProvince] = useState<Province>();
    const [selectedDistrict, setSelectedDistrict] = useState<District>();
    const [selectedWard, setSelectedWard] = useState<Ward>();

    const handleProvinceChange = async (value: number) => {
        const province = provinces.find(
            (item) => item.ProvinceID === value
        );

        if (!province) return;

        setSelectedProvince(province);

        form.setFieldsValue({
            district: undefined,
            ward: undefined,
        });

        await getDistricts(value);
    };

    const handleDistrictChange = async (value: number) => {
        const district = districts.find(
            (item) => item.DistrictID === value
        );

        if (!district) return;

        setSelectedDistrict(district);

        form.setFieldsValue({
            ward: undefined,
        });

        await getWards(value);
    };

    const handleWardChange = async (value: string) => {
        const ward = wards.find(
            (item) => item.WardCode === value
        );

        if (!ward || !selectedDistrict) return;

        setSelectedWard(ward);

        const payload: ShippingFeeBody= {
            fromDistrictId: 1680,
            fromWardCode: "220101",
            toDistrictId: selectedDistrict.DistrictID,
            toWardCode: ward.WardCode,
            height: 10,
            width: 30,
            length: 40,
            weight: 3000,
            insuranceValue: 0,
        };

        await getFee(payload);
    };

    return {
        provinces,
        districts,
        wards,

        selectedProvince,
        selectedDistrict,
        selectedWard,

        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
    };
};
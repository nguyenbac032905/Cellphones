import axios from "axios";
import { GetFeeBody } from "../../validations/client/shipping.validation";

const ghnClient = axios.create({
    baseURL: process.env.GHN_BASE_URL,
    headers: {
        Token: process.env.GHN_TOKEN,
        ShopId: process.env.GHN_SHOP_ID,
        "Content-Type": "application/json"
    }
});

export const getProvincesService = async () => {
    const {data} = await ghnClient.get("/master-data/province");

    return {
        data: data.data
    };
};
export const getDistrictsService = async (provinceID: number) => {
    const {data} = await ghnClient.post("/master-data/district", {
        province_id: provinceID
    });

    return {
        data: data.data
    }
};
export const getWardsService = async (districtID: number) => {
    const {data} = await ghnClient.post("/master-data/ward", {
        district_id: districtID
    });

    return {
        data: data.data
    }
};
export const getFeeService = async (body: GetFeeBody) => {
    const {data} = await ghnClient.post("/v2/shipping-order/fee",{
        from_district_id: body.fromDistrictId,
        from_ward_code: body.fromWardCode,
        to_district_id: body.toDistrictId,
        to_ward_code: body.toWardCode,
        service_type_id: 2,
        height: body.height,
        width: body.width,
        length: body.length,
        weight: body.weight,
        insurance_value: body.insuranceValue
    });

    return {
        data: data.data
    }
};
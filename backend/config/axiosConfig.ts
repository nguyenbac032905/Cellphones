import axios from "axios";

export const ghnClient = axios.create({
    baseURL: process.env.GHN_BASE_URL,
    headers: {
        Token: process.env.GHN_TOKEN,
        ShopId: process.env.GHN_SHOP_ID,
        "Content-Type": "application/json"
    }
});
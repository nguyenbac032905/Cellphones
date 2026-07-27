import crypto from "crypto";
import qs from "qs";

interface CreateVNPayUrlParams {
    orderID: string;
    amount: number;
    orderInfo?: string;
    ipAddr?: string;
}

const formatVNPayDate = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return (
        date.getFullYear().toString() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) +
        pad(date.getHours()) +
        pad(date.getMinutes()) +
        pad(date.getSeconds())
    );
};

export const sortObject = (obj: Record<string, any>) => {
    const sorted: Record<string, any> = {};

    Object.keys(obj)
        .sort()
        .forEach((key) => {
            sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
        });

    return sorted;
};

export const createVNPayUrl = ({ orderID, amount, orderInfo = "Thanh toan hoa don Cellphones", ipAddr = "127.0.0.1" }: CreateVNPayUrlParams): string => {
    const tmnCode = process.env.VNP_TMN_CODE!;
    const secretKey = process.env.VNP_HASH_SECRET!;
    const vnpUrl = process.env.VNP_URL!;
    const returnUrl = process.env.VNP_RETURN_URL!;

    const createDate = formatVNPayDate(new Date());
    const expireDate = formatVNPayDate(new Date(Date.now() + 15 * 60 * 1000));

    let vnp_Params: Record<string, any> = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderID,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: "electronics",
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expireDate
    };

    vnp_Params = sortObject(vnp_Params);
    const signData = qs.stringify(vnp_Params, { encode: false });

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    vnp_Params["vnp_SecureHash"] = signed;
    console.log("Url:",`${vnpUrl}?${qs.stringify(vnp_Params, { encode: false })}`)
    return `${vnpUrl}?${qs.stringify(vnp_Params, { encode: false })}`;
};
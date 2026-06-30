import jwt,{ SignOptions }  from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES! as SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES! as SignOptions["expiresIn"];

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, ACCESS_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES})
}

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES})
}
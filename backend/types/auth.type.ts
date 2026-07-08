import { JwtPayload } from "jsonwebtoken";

export interface AccessTokenPayload extends JwtPayload {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar?: string;
    accountType: string;
    roleID: string;
    status: string;
}

export interface AuthUser extends AccessTokenPayload {
    permissions: string[];
}
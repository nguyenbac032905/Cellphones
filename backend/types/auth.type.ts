import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";


export interface AccessTokenPayload extends JwtPayload {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
    avatar?: string;
    accountType: string;
    roleID?: {
        _id: string,
        permissions: string[]
    } | null;
    status: string;
}

export interface AuthenticatedUser {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    phone?: string | null;
    avatar?: string | null;
    accountType: string;
    roleID?: {
        _id: Types.ObjectId;
        permissions?: string[];
    } | null;
    status: string;
}
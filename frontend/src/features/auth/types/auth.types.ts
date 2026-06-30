export interface User {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    accountType: string;
    roleID: string;
    status: string;
}
export interface LoginPayload {
    email: string;
    password: string;
}
export interface LoginResponse {
    accessToken: string;
    user: User;
    message: string;
}

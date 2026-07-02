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
export type LoginPayload = {
    email: string;
    password: string;
}
export type DataResponse = {
    accessToken: string;
    user: User;
}
export type LoginResponse = {
    success: boolean;
    message: string;
    data: DataResponse;
}

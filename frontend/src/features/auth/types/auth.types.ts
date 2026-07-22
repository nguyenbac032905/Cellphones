interface BaseUser {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
}
export interface Client extends BaseUser {
    accountType: "client";
}
export interface Admin extends BaseUser {
    accountType: "admin";
    status: "active" | "inactive";
    roleID: {
        _id: string;
        permissions: string[];
    };
}
export type AuthUser = Admin | Client;

export type LoginPayload = {
    email: string;
    password: string;
};

export type AuthResponse<T extends AuthUser = AuthUser> = {
    accessToken: string;
    user: T;
};

export type LoginResponse<T extends AuthUser = AuthUser> = {
    success: boolean;
    message: string;
    data: AuthResponse<T>;
};

export type GetMeResponse<T extends AuthUser = AuthUser> = {
    success: boolean;
    data: {
        user: T;
    };
};

export type AdminLoginResponse = LoginResponse<Admin>;
export type UserLoginResponse = LoginResponse<Client>;

export type GetAdminResponse = GetMeResponse<Admin>;
export type GetUserResponse = GetMeResponse<Client>;
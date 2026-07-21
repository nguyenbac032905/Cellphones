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

export type LoginPayload = {
    email: string;
    password: string;
};

type AuthResponse<T extends BaseUser> = {
    accessToken: string;
    user: T;
};

type LoginResponse<T extends BaseUser> = {
    success: boolean;
    message: string;
    data: AuthResponse<T>;
};

type GetMeResponse<T extends BaseUser> = {
    success: boolean;
    data: {
        user: T;
    };
};

export type AdminLoginResponse = LoginResponse<Admin>;
export type UserLoginResponse = LoginResponse<Client>;

export type GetAdminResponse = GetMeResponse<Admin>;
export type GetUserResponse = GetMeResponse<Client>;
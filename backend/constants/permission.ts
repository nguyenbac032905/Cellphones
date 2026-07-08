export const PERMISSIONS = {
    PRODUCTS: {
        READ: "products-read",
        CREATE: "products-create",
        UPDATE: "products-update",
        DELETE: "products-delete",
    },

    CATEGORIES: {
        READ: "categories-read",
        CREATE: "categories-create",
        UPDATE: "categories-update",
        DELETE: "categories-delete",
    },

    ORDERS: {
        READ: "orders-read",
        UPDATE: "orders-update",
    },

    USERS: {
        READ: "users-read",
        CREATE: "users-create",
        UPDATE: "users-update",
        DELETE: "users-delete",
    },

    ROLES: {
        READ: "roles-read",
        CREATE: "roles-create",
        UPDATE: "roles-update",
        DELETE: "roles-delete",
    },
    
    Uploads: {
        Images: "uploads-images"
    }
} as const;

// tạo set để tạo enum cho permission
export const ALL_PERMISSIONS = Object.values(PERMISSIONS).flatMap((module) =>
    Object.values(module)
);
export const PERMISSION_SET = new Set<string>(ALL_PERMISSIONS);
export const permissionGroups = [
    {
        title: "Products",
        permissions: [
            { label: "View", value: "products-read" },
            { label: "Create", value: "products-create" },
            { label: "Update", value: "products-update" },
            { label: "Delete", value: "products-delete" },
        ],
    },
    {
        title: "Categories",
        permissions: [
            { label: "View", value: "categories-read" },
            { label: "Create", value: "categories-create" },
            { label: "Update", value: "categories-update" },
            { label: "Delete", value: "categories-delete" },
        ],
    },
    {
        title: "Orders",
        permissions: [
            { label: "View", value: "orders-read" },
            { label: "Update", value: "orders-update" },
        ],
    },
    {
        title: "Users",
        permissions: [
            { label: "View", value: "users-read" },
            { label: "Create", value: "users-create" },
            { label: "Update", value: "users-update" },
            { label: "Delete", value: "users-delete" },
        ],
    },
    {
        title: "Roles",
        permissions: [
            { label: "View", value: "roles-read" },
            { label: "Create", value: "roles-create" },
            { label: "Update", value: "roles-update" },
            { label: "Delete", value: "roles-delete" },
        ],
    },
    {
        title: "Uploads",
        permissions: [
            { label: "Images", value: "uploads-images" }
        ],
    },
];
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
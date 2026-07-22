import type { ApiResponse } from "../../../shared/types/common.type";

export interface ProductInCart {
    _id: string;
    title: string;
    price: number;
    stock: number;
    discountPercentage: number;
    mainImage: string;
    slug: string
}

export interface CartItem {
    _id: string;
    productID: ProductInCart;
    quantity: number;
}

export interface Cart {
    _id: string;
    userID: string;
    products: CartItem[];
}

export type CartResponse = ApiResponse<Cart>;
import { Types } from "mongoose";
import Cart from "../../models/cart.model"
import { AppError } from "../../utils/AppError";
import { BulkDeleteBody, CartItemBody } from "../../validations/client/cart.validation";
interface PopulatedProduct {
    _id: Types.ObjectId;
    title: string;
    price: number;
    discountPercentage: number;
    stock: number;
    slug: string;
    images: {
        url: string;
        isMain: boolean;
    }[];
    mainImage?: string;
}
export const getCartService = async (userID: string) => {
    const cart = await Cart.findOne({ userID }).select("_id userID products")
        .populate<{ products: { productID: PopulatedProduct }[] }>({
            path: "products.productID",
            select: "_id title price images discountPercentage stock slug"
        })
        .lean();
    if (!cart) {
        throw new AppError("Cart not found", 404);
    }
    const data = {
        ...cart,
        products: cart.products.map(item => {
            return {
                ...item,
                productID: {
                    _id: item.productID._id,
                    title: item.productID.title,
                    price: item.productID.price,
                    stock: item.productID.stock,
                    discountPercentage: item.productID.discountPercentage,
                    mainImage: item.productID.images.find(i => i.isMain)?.url,
                    slug: item.productID.slug
                }
            }
        })
    }
    return {
        data: data
    }
}
export const addItemService = async (userID: string, body: CartItemBody) => {
    const cart = await Cart.findOne({ userID });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const existingProduct = cart.products.find(item => item.productID.toString() === body.productID);

    if (existingProduct) {
        existingProduct.quantity += body.quantity;
    } else {
        cart.products.push({
            productID: body.productID,
            quantity: body.quantity
        });
    }

    await cart.save();

    return {
        message: "Add product to cart successfully"
    };
};
export const editItemService = async ( userID: string, body: CartItemBody ) => {
    const cart = await Cart.findOneAndUpdate(
        {
            userID,
            "products.productID": body.productID
        },
        {
            $set: {
                "products.$.quantity": body.quantity
            }
        },
        {
            new: true
        }
    );
    
    if (!cart) {
        throw new AppError("Product not found in cart.", 404);
    }

    return {
        message: "Update cart item successfully"
    };
};
export const deleteItemService = async (userID: string, body: CartItemBody) => {
    const result = await Cart.updateOne(
        {
            userID,
            "products.productID": body.productID
        },
        {
            $pull: {
                products: {
                    productID: body.productID
                }
            }
        }
    );

    if (result.matchedCount === 0) {
        throw new AppError("Product not found in cart", 404);
    }

    return {
        message: "Remove product from cart successfully"
    };
};
export const bulkDeleteItemService = async ( userID: string, body: BulkDeleteBody ) => {
    const cart = await Cart.findOneAndUpdate(
        {
            userID,
            "products.productID": { $in: body.productIDs }
        },
        {
            $pull: {
                products: {
                    productID: {
                        $in: body.productIDs
                    }
                }
            }
        },
        {
            projection: { _id: 1 }
        }
    );

    if (!cart) {
        throw new AppError("No matching products found in cart.", 404);
    }

    return {
        message: "Remove products from cart successfully"
    };
};
import { Types } from "mongoose";
import Cart from "../../models/cart.model"
import ProductVariant from "../../models/productVariant.model";
import { getBranchStockMap } from "../../helpers/inventory";
import { AppError } from "../../utils/AppError";
import { BulkDeleteBody, CartItemBody, DeleteCartBody } from "../../validations/client/cart.validation";
interface PopulatedProduct {
    _id: Types.ObjectId;
    title: string;
    discountPercentage: number;
    slug: string;
    images: {
        url: string;
        isMain: boolean;
    }[];
}
export const getCartService = async (userID: string, branchId: string) => {
    const cart = await Cart.findOne({ userID }).select("_id userID products")
        .populate<{ products: { _id: Types.ObjectId; productID: PopulatedProduct | null; variantID?: Types.ObjectId; quantity: number }[] }>({
            path: "products.productID",
            select: "_id title images discountPercentage slug"
        })
        .lean();
    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    // Chỉ giữ các dòng có đủ sản phẩm + variant (bỏ dòng cũ chưa có variant hoặc sản phẩm đã bị xóa)
    const validLines = cart.products.filter(item => item.productID && item.variantID);

    const variants = await ProductVariant.find({
        _id: { $in: validLines.map(item => item.variantID) },
        deleted: false,
        status: "active"
    }).select("_id sku attributes price images").lean();
    const variantMap = new Map(variants.map(v => [v._id.toString(), v]));

    const stockMap = await getBranchStockMap(branchId, variants.map(v => v._id));

    const products = validLines
        .filter(item => variantMap.has(item.variantID!.toString()))
        .map(item => {
            const product = item.productID!;
            const variant = variantMap.get(item.variantID!.toString())!;
            const variantImage = variant.images?.find(i => i.isMain)?.url ?? variant.images?.[0]?.url;
            const productImage = product.images?.find(i => i.isMain)?.url ?? product.images?.[0]?.url;

            return {
                _id: item._id,
                quantity: item.quantity,
                productID: {
                    _id: product._id,
                    title: product.title,
                    // Giá + tồn kho theo đúng variant người dùng đã chọn
                    price: variant.price,
                    stock: stockMap.get(variant._id.toString()) ?? 0,
                    discountPercentage: product.discountPercentage,
                    mainImage: variantImage ?? productImage,
                    slug: product.slug
                },
                variant: {
                    _id: variant._id,
                    sku: variant.sku,
                    attributes: variant.attributes ?? {}
                }
            };
        });

    return {
        data: {
            _id: cart._id,
            userID: cart.userID,
            products
        }
    }
}

// Kiểm tra variant tồn tại, đang bán và thuộc đúng sản phẩm
const assertVariantBelongsToProduct = async (productID: string, variantID: string) => {
    const variant = await ProductVariant.findOne({
        _id: variantID,
        product_id: productID,
        deleted: false,
        status: "active"
    }).select("_id").lean();

    if (!variant) {
        throw new AppError("Biến thể sản phẩm không tồn tại hoặc không thuộc sản phẩm này", 404);
    }
};

export const addItemService = async (userID: string, body: CartItemBody) => {
    const cart = await Cart.findOne({ userID });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    await assertVariantBelongsToProduct(body.productID, body.variantID);

    const existingProduct = cart.products.find(item => item.variantID?.toString() === body.variantID);

    if (existingProduct) {
        existingProduct.quantity += body.quantity;
    } else {
        cart.products.push({
            productID: body.productID,
            variantID: body.variantID,
            quantity: body.quantity
        });
    }

    await cart.save();

    return {
        message: "Add product to cart successfully"
    };
};
export const editItemService = async (userID: string, body: CartItemBody) => {
    const cart = await Cart.findOneAndUpdate(
        {
            userID,
            "products.variantID": body.variantID
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
export const deleteItemService = async (userID: string, body: DeleteCartBody) => {
    const result = await Cart.updateOne(
        {
            userID,
            "products.variantID": body.variantID
        },
        {
            $pull: {
                products: {
                    variantID: body.variantID
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
export const bulkDeleteItemService = async (userID: string, body: BulkDeleteBody) => {
    const cart = await Cart.findOneAndUpdate(
        {
            userID,
            "products.variantID": { $in: body.variantIDs }
        },
        {
            $pull: {
                products: {
                    variantID: {
                        $in: body.variantIDs
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

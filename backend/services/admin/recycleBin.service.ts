import mongoose from "mongoose";
import Product from "../../models/product.model"
import { AppError } from "../../utils/AppError";

export const getProductDeleted = async () => {
    const products = await Product.find({deleted: true}).select("-content -description -product_category_id");
    return {
        data: products
    }
}
export const restoreProductService = async (productID: string) => {
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        throw new AppError("Invalid product id", 400);
    }
    const product = await Product.findByIdAndUpdate(
        productID,
        {
            deleted: false,
            deletedAt: null
        },
        {
            new: true
        }
    );
    if (!product) {
        throw new AppError("Product not found", 404);
    }
    return {
        message: "Product restored successfully",
    };
};
export const forceProductService = async (productID: string) => {
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        throw new AppError("Invalid product id", 400);
    }
    const result = await Product.deleteOne({
        _id: productID
    });

    if (result.deletedCount === 0) {
        throw new AppError("Product not found", 404);
    }
    return {
        message: "Product deleted permanently successfully"
    };
};
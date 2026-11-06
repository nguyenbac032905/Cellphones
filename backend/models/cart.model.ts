import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
{
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            // Biến thể (màu/dung lượng...) người dùng đã chọn. Một dòng giỏ hàng = 1 variant
            variantID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ProductVariant"
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ]
},
{
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema, "carts");

export default Cart;
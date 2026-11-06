import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        attributes: {
            type: Map,
            of: String,
            default: {}
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        images: {
            type: [
                {
                    url: {
                        type: String,
                        required: true
                    },
                    isMain: {
                        type: Boolean,
                        default: false
                    }
                }
            ],
            default: []
        },

        sold: {
            type: Number,
            default: 0,
            min: 0
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },

        position: {
            type: Number,
            default: 0
        },

        deleted: {
            type: Boolean,
            default: false
        },

        deletedAt: Date
    },
    {
        timestamps: true
    }
);

// Tìm variant theo sản phẩm
productVariantSchema.index({
    product_id: 1,
    status: 1,
    deleted: 1
});

const ProductVariant = mongoose.model(
    "ProductVariant",
    productVariantSchema,
    "product_variants"
);

export default ProductVariant;

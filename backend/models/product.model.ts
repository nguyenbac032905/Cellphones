import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        product_category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductCategory",
            default: null
        },
        description: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        discountPercentage: {
            type: Number,
            default: 0,
            min: 0
        },
        stock: {
            type: Number,
            default: 0,
            min: 0
        },
        sold: {
            type: Number,
            default: 0,
            min: 0
        },
        thumbnail: {
            type: String,
            default: ""
        },
        images: {
            type: [String],
            default: []
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
        featured: {
            type: Boolean,
            default: false
        },
        slug: {
            type: String,
            slug: "title",
            unique: true
        } as any,
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

//danh index de ho tro query, filter, sort
productSchema.index({status: 1});
productSchema.index({product_category_id: 1});
productSchema.index({title: 1});
productSchema.index({position: 1});
productSchema.index({price: 1});
productSchema.index({deleted: 1});
//danh index de ho tro search

const Product = mongoose.model("Product", productSchema, "products");

export default Product;
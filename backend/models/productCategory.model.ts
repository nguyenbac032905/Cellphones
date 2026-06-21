import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        parent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductCategory",
            default: null
        },
        description: {
            type: String,
            default: ""
        },
        thumbnail: {
            type: String,
            default: ""
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

productCategorySchema.index({ status: 1});
productCategorySchema.index({ parent_id: 1});
productCategorySchema.index({ title: 1});
productCategorySchema.index({ position: 1});
productCategorySchema.index({ deleted: 1});

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "product-category");
export default ProductCategory;
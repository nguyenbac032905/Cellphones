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
        // LƯU Ý (sửa sau): ProductCategory chỉ nên biểu diễn LOẠI sản phẩm
        // (Điện thoại, Đồng hồ, Laptop...). Không tạo category theo hãng
        // (vd "Samsung - Điện thoại", "Samsung - Đồng hồ"); hãng đã có model Brand riêng.
        // Nếu DB hiện có category kiểu theo hãng thì cần gộp/migrate lại khi bật tính năng brand.
        // TODO (tuỳ chọn, thêm sau): brand_ids để biết danh mục này có những hãng nào:
        // brand_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
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
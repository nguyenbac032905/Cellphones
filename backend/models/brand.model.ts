import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

// Brand = thương hiệu/hãng (Samsung, Apple, Xiaomi...).
// Một brand dùng chung cho nhiều ProductCategory (vd: Samsung có cả điện thoại và đồng hồ),
// nên không cần tạo "Samsung" 2 lần trong ProductCategory.
const brandSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: ""
        },
        logo: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        },
        // (Tuỳ chọn, bổ sung sau) Giới hạn brand này bán ở những danh mục nào.
        // Dùng để lọc brand theo danh mục ở trang filter. Để rỗng = áp dụng mọi danh mục.
        // category_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory" }],
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

brandSchema.index({ status: 1 });
brandSchema.index({ title: 1 });
brandSchema.index({ position: 1 });
brandSchema.index({ deleted: 1 });

const Brand = mongoose.model("Brand", brandSchema, "brands");
export default Brand;

import Product from "../../models/product.model"
import ProductCategory from "../../models/productCategory.model";
import { getAllChildCategoryIds } from "../admin/productCategories.service";

export const getProductsByCategoryService = async (categorySlug: string) => {
    const category = await ProductCategory.findOne({ slug: categorySlug, deleted: false, status: "active", }).select("_id").lean();

    if (!category) {
        return {
            data: [],
        };
    }

    const allChildCategoryIds = await getAllChildCategoryIds(category._id.toString());

    const result = await Product.find({ product_category_id: { $in: allChildCategoryIds, }, deleted: false, status: "active", }).select("title slug featured images price discountPercentage").lean();

    const products = result.map((item) => ({
        title: item.title,
        slug: item.slug,
        featured: item.featured,
        mainImage: item.images.find((img) => img.isMain)?.url ?? null,
        price: item.price,
        discountPercentage: item.discountPercentage
    }));

    return {
        data: products,
    };
};
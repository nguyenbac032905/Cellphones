import { createTree } from "../../helpers/createTree";
import ProductCategory from "../../models/productCategory.model";

export const getCategoryTreeService = async () => {
    const categories = await ProductCategory.find({deleted: false, status: "active"}).select("_id title parent_id description thumbnail slug").sort({position: 1}).lean();
    const categoryTree = createTree(categories);
    return {
        data: categoryTree
    };
};
export const getAllChildCategoryBySlugService = async (categorySlug: string) => {
    
    const parent = await ProductCategory.findOne({ deleted: false, status: "active", slug: categorySlug, }).select("_id").lean();
    
    if (!parent) {
        return {
            data: [],
        };
    }

    const categories = await ProductCategory.find({ deleted: false, status: "active", parent_id: parent._id, }).select("title slug thumbnail").lean();

    return {
        data: categories,
    };
};
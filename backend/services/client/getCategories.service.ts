import { createTree } from "../../helpers/createTree";
import ProductCategory from "../../models/productCategory.model"

export const getCategoryTreeService = async () => {
    const categories = await ProductCategory.find({deleted: false, status: "active"}).select("_id title parent_id description thumbnail slug").lean();
    const categoryTree = createTree(categories);
    return {
        data: categoryTree
    };
};
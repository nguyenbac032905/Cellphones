import mongoose from "mongoose";
import { createTree, findChildCategoryIds } from "../../helpers/createTree";
import ProductCategory from "../../models/productCategory.model";

type Category = {
  _id: mongoose.Types.ObjectId;
  parent_id?: mongoose.Types.ObjectId;
};
//hàm tạo cây
export const getCategoryTreeService = async () => {
    const categories = await ProductCategory.find({deleted: false}).lean();
    const categoryTree = createTree(categories);
    return categoryTree;
}
//hàm lấy ra tất cả category con
export const getAllChildCategoryIds = async (
  parentId: string
): Promise<mongoose.Types.ObjectId[]> => {

  const categories = await ProductCategory.find()
    .select("_id parent_id")
    .lean<Category[]>();

  return findChildCategoryIds(
    categories,
    parentId
  );
};
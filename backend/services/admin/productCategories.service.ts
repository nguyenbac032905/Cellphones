import mongoose from "mongoose";
import { createTree, findChildCategoryIds } from "../../helpers/createTree";
import ProductCategory from "../../models/productCategory.model";

type Category = {
  _id: mongoose.Types.ObjectId;
  parent_id?: mongoose.Types.ObjectId;
};
//service tạo cây
export const getCategoryTreeService = async () => {
    const categories = await ProductCategory.find({deleted: false}).lean();
    const categoryTree = createTree(categories);
    return {
      data: categoryTree
    };
}
//service lấy ra tất cả category con, service này được product service gọi để lấy danh sách category con nên không cần chuẩn hóa
export const getAllChildCategoryIds = async (parentId: string): Promise<mongoose.Types.ObjectId[]> => {
    const categories = await ProductCategory.find({deleted: false}).select("_id parent_id").lean<Category[]>();
    const childCategoryIds = findChildCategoryIds(categories,parentId);
    return childCategoryIds;
};
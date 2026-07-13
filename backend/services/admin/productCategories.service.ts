import mongoose from "mongoose";
import { createTree, findChildCategoryIds, findParentCategory } from "../../helpers/createTree";
import ProductCategory from "../../models/productCategory.model";
import { CreateCategoryBody, GetCategoriesQuery, UpdateCategoryBody } from "../../validations/admin/productCategory.validation";
import { AppError } from "../../utils/AppError";

type Category = {
  _id: mongoose.Types.ObjectId;
  parent_id?: mongoose.Types.ObjectId;
  [key: string]: any;
};
export const getCategoryTreeService = async () => {
    const categories = await ProductCategory.find({deleted: false}).select("_id title parent_id description thumbnail slug").lean();
    const categoryTree = createTree(categories);
    return {
      data: categoryTree
    };
};
//service lấy ra tất cả category con, service này được product service gọi để lấy danh sách category con nên không cần chuẩn hóa
export const getAllChildCategoryIds = async (parentId: string): Promise<mongoose.Types.ObjectId[]> => {
    const categories = await ProductCategory.find({deleted: false}).select("_id parent_id").lean<Category[]>();
    const childCategoryIds = findChildCategoryIds(categories,parentId);
    return childCategoryIds;
};
// service lấy ra tất cả category cha ông
export const getAllParentCategory = async ( categoryID: string ) => {
    const categories = await ProductCategory.find({ deleted: false, }) .select("_id parent_id status") .lean<Category[]>();
    return findParentCategory(categories, categoryID);
};
export const getCategoriesService = async (query: GetCategoriesQuery) => {
    const { status, category, search, sort, page = 1, limit = 4 } = query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Filter
    const match: any = {
        deleted: false,
    };

    if (status) {
        match.status = status;
    }

    // Lọc theo category và toàn bộ category con
    if (category) {
        const categoryIds = await getAllChildCategoryIds(category);
        match._id = {
            $in: categoryIds,
        };
    }

    // Sort
    let sortOption: any;
    switch (sort) {
        case "created-asc":
            sortOption = { createdAt: 1 };
            break;
        case "created-desc":
            sortOption = { createdAt: -1 };
            break;
        case "position-desc":
            sortOption = { position: -1 };
            break;
        default:
            sortOption = { position: 1 };
            break;
    }

    const pipeline: any[] = [];

    // Search
    if (search) {
        pipeline.push({
            $search: {
                index: "default",
                text: {
                    query: search,
                    path: ["title", "slug"],
                },
            },
        });
    }

    pipeline.push({
        $match: match,
    });

    pipeline.push({
        $facet: {
            categories: [
                { $sort: sortOption },
                { $skip: skip },
                { $limit: limitNum },
                {
                    $lookup: {
                        from: "product-category", // tên collection trong MongoDB
                        localField: "parent_id",
                        foreignField: "_id",
                        as: "parent",
                    },
                },
                {
                    $unwind: {
                        path: "$parent",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        thumbnail: 1,
                        parent_id: 1,
                        parentTitle: "$parent.title",
                        position: 1,
                        status: 1,
                    },
                },
            ],
            total: [
                {
                    $count: "count",
                },
            ],
        },
    });

    const result = await ProductCategory.aggregate(pipeline).allowDiskUse(true);

    const categories = result[0].categories;
    const total = result[0].total[0]?.count || 0;

    return {
        data: categories,
        meta: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum),
        },
    };
};
export const createCategoryService = async (body: CreateCategoryBody) => {
    if (body.position === undefined) {
        const maxCategory = await ProductCategory.findOne().sort({ position: -1 }).select("position");
        body.position = maxCategory ? maxCategory.position + 1 : 1;
    }

    await ProductCategory.create(body);

    return {
        message: "Created Category successfully",
    };
};
export const updateCategoryService = async ( categoryID: string, body: UpdateCategoryBody ) => {
    if (body.status === "inactive") {
        const categoryIds = await getAllChildCategoryIds(categoryID);

        const result = await ProductCategory.updateMany(
            { _id: { $in: categoryIds } },
            { $set: { status: "inactive" } }
        );
        delete body.status
        if (result.matchedCount === 0) {
            throw new AppError("Product Category not found", 404);
        }
    }

    if (body.status === "active") {
        const parents = await getAllParentCategory(categoryID);

        const existInactive = parents.some(
            (item) => item.status === "inactive"
        );

        if (existInactive) {
            throw new AppError(
                "Can't activate category because a parent category is inactive.",
                400
            );
        }
    }

    const result = await ProductCategory.updateOne(
        { _id: categoryID },
        {
            $set: body,
        }
    );

    if (result.matchedCount === 0) {
        throw new AppError("Product Category not found", 404);
    }

    return {
        message: "Updated Category successfully",
    };
};
export const getCategoryService = async (categoryID: string) => {
    const category = await ProductCategory.findOne({_id: categoryID, deleted: false}).populate("parent_id", "title").select("-__v").lean();
    if(!category){
        throw new AppError("Product Category not found", 404);
    }
    return {
        data: category
    };
};
export const deleteCategoryService = async (categoryID: string) => {
    const categoryIds = await getAllChildCategoryIds(categoryID);

    const result = await ProductCategory.updateMany({ _id: {$in: categoryIds}}, {$set: { deleted: true}});

    if (result.matchedCount === 0) {
        throw new AppError("Product Category not found", 404);
    }

    return {
        message: "Deleted Category successfully",
    };
};
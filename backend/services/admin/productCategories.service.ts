import mongoose from "mongoose";
import { createTree, findChildCategoryIds } from "../../helpers/createTree";
import ProductCategory from "../../models/productCategory.model";
import { CreateCategoryBody, GetCategoriesQuery } from "../../validations/admin/productCategory.validation";
import { AppError } from "../../utils/AppError";

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
};
//service lấy ra tất cả category con, service này được product service gọi để lấy danh sách category con nên không cần chuẩn hóa
export const getAllChildCategoryIds = async (parentId: string): Promise<mongoose.Types.ObjectId[]> => {
    const categories = await ProductCategory.find({deleted: false}).select("_id parent_id").lean<Category[]>();
    const childCategoryIds = findChildCategoryIds(categories,parentId);
    return childCategoryIds;
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
        message: "Create Category successfully",
    };
};
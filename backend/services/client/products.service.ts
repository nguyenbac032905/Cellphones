import Product from "../../models/product.model"
import ProductCategory from "../../models/productCategory.model";
import { AppError } from "../../utils/AppError";
import { getAllChildCategoryIds } from "../admin/productCategories.service";

export const getProductsByCategoryService = async (categorySlug: string, query: any) => {
    const category = await ProductCategory.findOne({ slug: categorySlug, deleted: false, status: "active", }).select("_id").lean();

    if (!category) {
        return {
            data: [],
        };
    }

    const allChildCategoryIds = await getAllChildCategoryIds(category._id.toString());

    const { featured, discount, minPrice, maxPrice, search, sort, page = 1, limit = 20 } = query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const match: any = {
        deleted: false,
        status: "active",
        product_category_id: {$in: allChildCategoryIds}
    };

    // featured
    if (featured) {
        match.featured = featured==="true" ? true : false;
    }
    
    // discount
    if (discount !== undefined) {
        match.discountPercentage = {
            $gte: Number(discount)
        };
    }

    // price
    if (minPrice !== undefined || maxPrice !== undefined) {
        match.price = {};

        if (minPrice !== undefined) {
            match.price.$gte = Number(minPrice);
        }

        if (maxPrice !== undefined) {
            match.price.$lte = Number(maxPrice);
        }
    }

    const pipeline: any = [];

    // Search trước
    if (search) {
        pipeline.push({
            $search: {
                index: "default",
                text: {
                    query: search,
                    path: ["title", "slug"]
                }
            }
        });
    }

    pipeline.push({
        $match: match
    });

    // Sort
    let sortOption: Record<string, 1 | -1>;

    switch (sort) {
        case "price-asc":
            sortOption = { price: 1 };
            break;

        case "price-desc":
            sortOption = { price: -1 };
            break;

        case "discount-desc":
            sortOption = { discountPercentage: -1, };
            break;

        default:
            sortOption = { createdAt: -1 };
            break;
    }

    pipeline.push({
        $facet: {
            products: [
                {
                    $sort: sortOption
                },
                {
                    $skip: skip
                },
                {
                    $limit: limitNum
                },
                {
                    $project: {
                        title: 1,
                        slug: 1,
                        price: 1,
                        discountPercentage: 1,
                        featured: 1,
                        sold: 1,
                        createdAt: 1,

                        mainImage: {
                            $let: {
                                vars: {
                                    image: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$images",
                                                    as: "img",
                                                    cond: {
                                                        $eq: ["$$img.isMain", true]
                                                    }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                },
                                in: "$$image.url"
                            }
                        }
                    }
                }
            ],

            total: [
                {
                    $count: "count"
                }
            ]
        }
    });

    const result = await Product.aggregate(pipeline).allowDiskUse(true);

    const products = result[0].products;
    
    const total = result[0].total[0]?.count ?? 0;
    
    return {
        data: products,
        meta: {
            total: total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum)
        }
    };
};

export const getProductsService = async ( query: any ) => {
    const { featured, discount, minPrice, maxPrice, search, sort, page = 1, limit = 20 } = query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const match: any = {
        deleted: false,
        status: "active"
    };

    // featured
    if (featured) {
        match.featured = featured==="true" ? true : false;
    }
    
    // discount
    if (discount !== undefined) {
        match.discountPercentage = {
            $gte: Number(discount)
        };
    }

    // price
    if (minPrice !== undefined || maxPrice !== undefined) {
        match.price = {};

        if (minPrice !== undefined) {
            match.price.$gte = Number(minPrice);
        }

        if (maxPrice !== undefined) {
            match.price.$lte = Number(maxPrice);
        }
    }

    const pipeline: any = [];

    // Search trước
    if (search) {
        pipeline.push({
            $search: {
                index: "default",
                text: {
                    query: search,
                    path: ["title", "slug"]
                }
            }
        });
    }

    pipeline.push({
        $match: match
    });

    // Sort
    let sortOption: Record<string, 1 | -1>;

    switch (sort) {
        case "price-asc":
            sortOption = { price: 1 };
            break;

        case "price-desc":
            sortOption = { price: -1 };
            break;

        case "discount-desc":
            sortOption = { discountPercentage: -1, };
            break;

        default:
            sortOption = { createdAt: -1 };
            break;
    }

    pipeline.push({
        $facet: {
            products: [
                {
                    $sort: sortOption
                },
                {
                    $skip: skip
                },
                {
                    $limit: limitNum
                },
                {
                    $project: {
                        title: 1,
                        slug: 1,
                        price: 1,
                        discountPercentage: 1,
                        featured: 1,
                        sold: 1,
                        createdAt: 1,

                        mainImage: {
                            $let: {
                                vars: {
                                    image: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$images",
                                                    as: "img",
                                                    cond: {
                                                        $eq: ["$$img.isMain", true]
                                                    }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                },
                                in: "$$image.url"
                            }
                        }
                    }
                }
            ],

            total: [
                {
                    $count: "count"
                }
            ]
        }
    });

    const result = await Product.aggregate(pipeline).allowDiskUse(true);

    const products = result[0].products;
    const total = result[0].total[0]?.count ?? 0;

    return {
        data: products,
        meta: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum)
        }
    };
};

export const getProductService = async (productSlug: string) => {
    const product = await Product.findOne({slug: productSlug,deleted: false, status: "active"})
                    .populate("product_category_id", "slug title")
                    .select("title slug description content price discountPercentage stock sold featured images").lean();
    if(!product){
        throw new AppError("Product not found", 404);
    }
    return {
        data: product
    }
}
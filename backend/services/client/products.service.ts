import { Types } from "mongoose";
import Product from "../../models/product.model"
import ProductVariant from "../../models/productVariant.model";
import ProductCategory from "../../models/productCategory.model";
import { AppError } from "../../utils/AppError";
import { getAllChildCategoryIds } from "../admin/productCategories.service";
import { getBranchStockMap } from "../../helpers/inventory";

const variantPriceStages = (priceRange?: { min?: number; max?: number }) => {
    const stages: any[] = [
        {
            $lookup: {
                from: "product_variants",
                let: { productId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            status: "active",
                            deleted: false,
                            $expr: { $eq: ["$product_id", "$$productId"] }
                        }
                    },
                    { $project: { _id: 1, price: 1 } }
                ],
                as: "variants"
            }
        },
        {
            $addFields: {
                price: { $min: "$variants.price" }
            }
        }
    ];

    if (priceRange && (priceRange.min !== undefined || priceRange.max !== undefined)) {
        const priceMatch: Record<string, number> = {};

        if (priceRange.min !== undefined) {
            priceMatch.$gte = priceRange.min;
        }

        if (priceRange.max !== undefined) {
            priceMatch.$lte = priceRange.max;
        }

        stages.push({ $match: { price: priceMatch } });
    }

    return stages;
};

const inStockAtBranchStages = (branchId: string) => [
    {
        $lookup: {
            from: "inventories",
            let: { variantIds: "$variants._id" },
            pipeline: [
                {
                    $match: {
                        branch_id: new Types.ObjectId(branchId),
                        stock: { $gt: 0 },
                        $expr: { $in: ["$variant_id", "$$variantIds"] }
                    }
                },
                { $limit: 1 },
                { $project: { _id: 1 } }
            ],
            as: "branchInventory"
        }
    },
    {
        $match: {
            "branchInventory.0": { $exists: true }
        }
    }
];

const getSortOption = (sort?: string): Record<string, 1 | -1> => {
    switch (sort) {
        case "price-asc":
            return { price: 1 };

        case "price-desc":
            return { price: -1 };

        case "discount-desc":
            return { discountPercentage: -1 };

        default:
            return { createdAt: -1 };
    }
};

const buildListFacet = (sortOption: Record<string, 1 | -1>, skip: number, limitNum: number) => ({
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

export const getProductsByCategoryService = async (categorySlug: string, query: any, branchId: string) => {
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
        product_category_id: { $in: allChildCategoryIds }
    };

    // featured
    if (featured) {
        match.featured = featured === "true" ? true : false;
    }

    // discount
    if (discount !== undefined) {
        match.discountPercentage = {
            $gte: Number(discount)
        };
    }

    const priceRange = {
        min: minPrice !== undefined ? Number(minPrice * 1000000) : undefined,
        max: maxPrice !== undefined ? Number(maxPrice * 1000000) : undefined
    };

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

    pipeline.push(...variantPriceStages(priceRange));

    // Chỉ lấy sản phẩm còn hàng ở chi nhánh đang chọn
    pipeline.push(...inStockAtBranchStages(branchId));

    pipeline.push(buildListFacet(getSortOption(sort), skip, limitNum));

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

export const getProductsService = async (query: any, branchId: string) => {
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
        match.featured = featured === "true" ? true : false;
    }

    // discount
    if (discount !== undefined) {
        match.discountPercentage = {
            $gte: Number(discount)
        };
    }

    const priceRange = {
        min: minPrice !== undefined ? Number(minPrice) : undefined,
        max: maxPrice !== undefined ? Number(maxPrice) : undefined
    };

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

    pipeline.push(...variantPriceStages(priceRange));

    // Chỉ lấy sản phẩm còn hàng ở chi nhánh đang chọn
    pipeline.push(...inStockAtBranchStages(branchId));

    pipeline.push(buildListFacet(getSortOption(sort), skip, limitNum));

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

export const getProductService = async (productSlug: string, branchId: string) => {
    const product = await Product.findOne({ slug: productSlug, deleted: false, status: "active" })
        .populate("product_category_id", "slug title")
        .select("title slug description content discountPercentage sold featured images").lean();
    if (!product) {
        throw new AppError("Product not found", 404);
    }

    const variants = await ProductVariant.find({ product_id: product._id, status: "active", deleted: false })
        .select("_id price").lean();
    const stockMap = await getBranchStockMap(branchId, variants.map((variant) => variant._id));

    const price = variants.length > 0 ? Math.min(...variants.map((variant) => variant.price)) : 0;
    const stock = variants.reduce((total, variant) => total + (stockMap.get(variant._id.toString()) ?? 0), 0);

    return {
        data: {
            ...product,
            price,
            stock
        }
    }
}

export const getProductVariantsService = async (productSlug: string, branchId: string) => {
    const product = await Product.findOne({ slug: productSlug, deleted: false, status: "active" }).select("_id").lean();
    if (!product) {
        throw new AppError("Product not found", 404);
    }

    const variants = await ProductVariant.find({ product_id: product._id, status: "active", deleted: false })
        .select("_id sku attributes price images sold position")
        .sort({ position: 1, createdAt: 1 })
        .lean();

    const stockMap = await getBranchStockMap(branchId, variants.map((variant) => variant._id));

    return {
        data: variants.map((variant) => ({
            _id: variant._id,
            sku: variant.sku,
            attributes: variant.attributes ?? {},
            price: variant.price,
            images: variant.images ?? [],
            sold: variant.sold,
            stock: stockMap.get(variant._id.toString()) ?? 0
        }))
    };
};

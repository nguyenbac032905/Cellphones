
import mongoose from "mongoose";
import Product from "../../models/product.model";
import { getAllChildCategoryIds } from "./productCategories.service";
import { AppError } from "../../utils/AppError";

type Query = {
    status?: string;
    category?: string;
    stock?: string;
    search?: string;
    sort?: string;
    page?: string;
    limit?: string;
};

export const getProducts = async (query: Query = {}) => {
    const { status, category, stock, search, sort, page = "1", limit = "4" } = query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    //filter
    const match: any = { deleted: false };
    if (status) match.status = status;
    if (stock) {
        if (stock === "instock") {
            match.stock = { $gt: 0 };
        } else {
            match.stock = 0;
        }
    }
    //xu li lay ra category con va lọc theo category
    if (category) {
        const categoryIds = await getAllChildCategoryIds(category);
        match.product_category_id = { $in: categoryIds };
    }
    //sort
    let sortOption: any = {};
    switch (sort) {
        case "stock-asc":
            sortOption = { stock: 1 }
            break;
        case "stock-desc":
            sortOption = { stock: -1 }
            break;
        case "created-asc":
            sortOption = { createdAt: 1 }
            break;
        case "created-desc":
            sortOption = { createdAt: -1 }
            break;
        case "position-asc":
            sortOption = { position: 1 }
            break;
        case "price-asc":
            sortOption = { price: 1 }
            break;
        case "price-desc":
            sortOption = { price: -1 }
            break;
        default:
            sortOption = { position: -1 }
            break;
    }

    const pipeline: any[] = [];
    //search
    if (search) {
        pipeline.push({
            $search: {
                index: "default",
                text: {
                    query: search,
                    path: ["title", "slug"]
                }
            }
        })
    }
    //filter
    pipeline.push({ $match: match });
    //join
    pipeline.push(
        {
            $lookup: {
                from: "product-category",
                localField: "product_category_id",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $set: {
                category: {
                    _id: "$category._id",
                    name: "$category.title"
                }
            }
        }
    )
    //sort, pagination
    pipeline.push(
        { $sort: sortOption },
        {
            $facet: {
                products: [
                    { $skip: skip },
                    { $limit: limitNum }
                ],
                total: [
                    { $count: "count" }
                ]
            }
        },
    )

    const result = await Product.aggregate(pipeline);
    const products = result[0].products;
    const total = result[0].total[0]?.count || 0;

    return {
        data: products,
        meta: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum)
        }
    }
}
export const updateProductService = async (productID: string, body: Record<string, any>) => {
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        throw new AppError("Invalid product id", 400);
    }
    const productUpdateWhiteList = [
        "title",
        "product_category_id",
        "description",
        "content",
        "price",
        "discountPercentage",
        "stock",
        "thumbnail",
        "images",
        "status",
        "position",
        "featured"
    ];

    const updateFields: Record<string, any> = {};

    productUpdateWhiteList.forEach((field) => {
        if (body[field] !== undefined) {
            updateFields[field] = body[field];
        }
    });

    const product = await Product.findByIdAndUpdate(
        productID,
        updateFields,
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    return {
        message: "Product updated successfully"
    };
};
export const deleteProductService = async (productID: string) => {
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        throw new AppError("Invalid product id", 400);
    }

    const product = await Product.findByIdAndUpdate(
        productID,
        { deleted: true },
        { new: true }
    );

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    return {
        message: "Product deleted successfully"
    };
};
export const getProductByIDService = async (productID: string) => {
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        throw new AppError("Invalid product id", 400);
    }

    const product = await Product.findOne({
        _id: productID,
        deleted: false
    }).populate("product_category_id", "_id title");

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    return {
        data: product
    };
}
export const createProductService = async (
    body: Record<string, any>
) => {
    const productCreateWhiteList = [
        "title",
        "product_category_id",
        "description",
        "content",
        "price",
        "discountPercentage",
        "stock",
        "images",
        "status",
        "position",
        "featured",
    ];

    const createFields: Record<string, any> = {};

    productCreateWhiteList.forEach((field) => {
        if (body[field] !== undefined) {
            createFields[field] = body[field];
        }
    });

    if (createFields.product_category_id) {
        createFields.product_category_id =
            new mongoose.Types.ObjectId(
                createFields.product_category_id
            );
    }

    if (
        createFields.position === undefined ||
        createFields.position === null ||
        createFields.position === ""
    ) {
        const maxProduct = await Product.findOne({})
            .sort({ position: -1 })
            .select("position");

        createFields.position = maxProduct
            ? maxProduct.position + 1
            : 1;
    }

    const product = await Product.create(createFields);
    if(!product){
        throw new AppError("Failed to create product", 500);
    }
    return {
        message: "Product created successfully"
    };
};

import mongoose from "mongoose";
import Product from "../../models/product.model";
import { getAllChildCategoryIds } from "./productCategories.service";

type Query = {
  status?: string;
  category?: string;
  stock?: string;
  search?: string;
  sort?: string;
  page?: string;
  limit?: string;
};

export const getProducts = async (query:Query = {}) => {
    const {status, category,stock,search,sort,page="1",limit="4"} = query;
    
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum-1)*limitNum;

    //filter
    const match: any = {};
    if(status) match.status=status;
    if(stock){
        if(stock === "instock"){
            match.stock = {$gt: 0};
        }else{
            match.stock = 0;
        }
    }
    //xu li lay ra category con va lọc theo category
    if(category) {
        const categoryIds = await getAllChildCategoryIds(category);
        match.product_category_id = {$in: categoryIds};
    }
    //sort
    let sortOption: any = {};
    switch (sort) {
        case "stock-asc":
            sortOption = {stock: 1}
            break;
        case "stock-desc":
            sortOption = {stock: -1}
            break;
        case "created-asc":
            sortOption = {createdAt: 1}
            break;
        case "created-desc":
            sortOption = {createdAt: -1}
            break;
        case "position-asc":
            sortOption = {position: 1}
            break;
        case "price-asc":
            sortOption = {price: 1}
            break;
        case "price-desc":
            sortOption = {price: -1}
            break;
        default:
            sortOption = {position: -1}
            break;
    }

    const pipeline: any[] = [];
    //search
    if(search){
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
    pipeline.push({$match: match});
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
        {$sort: sortOption},
        {
            $facet: {
                products: [
                    {$skip: skip},
                    {$limit: limitNum}
                ],
                total: [
                    {$count: "count"}
                ]
            }
        },
    )

    const result = await Product.aggregate(pipeline);
    const products = result[0].products;
    const total = result[0].total[0]?.count || 0;

    return {
        products: products,
        pagination: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total/limitNum)
        }
    }
}
import Product from "../../models/product.model";
import { getProducts, updateProductService, deleteProductService, getProductByIDService, createProductService } from "../../services/admin/products.service";
import { sanitizeEditorContent } from "../../utils/sanitizeHtml";
import * as categoryService from "../../services/admin/productCategories.service";

jest.mock("../../models/product.model", () => ({
    __esModule: true,
    default: {
        aggregate: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
    }
}));

jest.mock("../../services/admin/productCategories.service", () => ({
    __esModule: true,
    getAllChildCategoryIds: jest.fn()
}));

jest.mock("../../utils/sanitizeHtml", () => ({
    __esModule: true,
    sanitizeEditorContent: jest.fn((html: string) => `sanitized:${html}`)
}));
// test service getproducts
// describe("getProducts", () => {
//     let mockAllowDiskUse: jest.Mock;
//     beforeEach(() => {
//         jest.clearAllMocks();

//         mockAllowDiskUse = jest.fn().mockResolvedValue([
//             {
//                 products: [{ title: "iphone" }],
//                 total: [{ count: 10 }]
//             }
//         ]);
//         (Product.aggregate as jest.Mock).mockReturnValue({
//             allowDiskUse: mockAllowDiskUse
//         });
//     });
//     //test search
//     describe("search", () => {
//         it("Khi truyền search vào query thì pipeline phải có $search", async () => {
//             await getProducts({ search: "iphone" });

//             expect(Product.aggregate).toHaveBeenCalledWith(
//                 expect.arrayContaining([
//                     expect.objectContaining({
//                         $search: {
//                             index: "default",
//                             text: {
//                                 query: "iphone",
//                                 path: ["title", "slug"]
//                             }
//                         }
//                     })
//                 ])
//             );
//         });

//         it("Khi không truyền search thì pipeline không được có $search", async () => {
//             await getProducts({ status: "active" });

//             const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];

//             expect( pipeline.find((stage: any) => stage.$search) ).toBeUndefined();
//         });
//     });
//     //test filter
//     describe("filter", () => {
//         it("khi truyền status, stock, category thì phải build đúng $match", async () => {
//             (categoryService.getAllChildCategoryIds as jest.Mock) .mockResolvedValue(["categoryID1", "categoryID2"]);

//             await getProducts({ status: "active", stock: "instock", category: "categoryID1" });

//             expect(Product.aggregate).toHaveBeenCalledWith(
//                 expect.arrayContaining([
//                     expect.objectContaining({
//                         $match: {
//                             deleted: false,
//                             status: "active",
//                             stock: { $gt: 0 },
//                             product_category_id: { $in: ["categoryID1", "categoryID2"] }
//                         }
//                     })
//                 ])
//             );
//         });

//         it("khi stock=outofstock thì phải filter stock = 0", async () => {
//             await getProducts({ stock: "outofstock" });

//             expect(Product.aggregate).toHaveBeenCalledWith(
//                 expect.arrayContaining([
//                     expect.objectContaining({
//                         $match: { deleted: false, stock: 0 }
//                     })
//                 ])
//             );
//         });

//         it("khi không truyền filter thì $match chỉ có deleted:false", async () => {
//             await getProducts();

//             expect(Product.aggregate).toHaveBeenCalledWith(
//                 expect.arrayContaining([
//                     expect.objectContaining({
//                         $match: {
//                             deleted: false
//                         }
//                     })
//                 ])
//             );
//         });
//     });
//     //test sort
//     describe("sort", () => {
//         test.each([ 
//             ["price-asc", { price: 1 }],
//             ["price-desc", { price: -1 }],
//             ["stock-asc", { stock: 1 }],
//             ["stock-desc", { stock: -1 }],
//             ["created-asc", { createdAt: 1 }],
//             ["created-desc", { createdAt: -1 }],
//             ["position-asc", { position: 1 }],
//             ["macdinh", { position: -1 }]
//         ])("sort=%s phải tạo đúng $sort", async (sort, expected) => {
//             await getProducts({sort});
//             const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];
//             const facetStage = pipeline.find((stage: any) => stage.$facet);
//             expect(facetStage.$facet.products).toEqual(
//                 expect.arrayContaining([
//                     expect.objectContaining({
//                         $sort: expected
//                     })
//                 ])
//             );
//         });

//         it("khi không truyền sort thì phải sort mặc định theo position giảm dần", async () => {
//             await getProducts();

//             const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];

//             const facetStage = pipeline.find( (stage: any) => stage.$facet );

//             expect(facetStage.$facet.products).toEqual(
//                 expect.arrayContaining([
//                     expect.objectContaining({
//                         $sort: { position: -1 }
//                     })
//                 ])
//             );
//         });
//     });
//     // test pagination
//     describe("pagination", () => {
//         it("khi truyền page và limit thì phải có $skip và $limit", async () => {
//             await getProducts({ page: "2", limit: "4" });

//             const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];

//             const facetStage = pipeline.find( (stage: any) => stage.$facet );

//             expect(facetStage.$facet.products).toEqual(
//                 expect.arrayContaining([
//                     { $skip: 4 },
//                     { $limit: 4 }
//                 ])
//             );
//         });

//         it("khi không truyền page và limit thì phải dùng giá trị mặc định", async () => {
//             await getProducts();

//             const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];

//             const facetStage = pipeline.find( (stage: any) => stage.$facet );

//             expect(facetStage.$facet.products).toEqual(
//                 expect.arrayContaining([
//                     { $skip: 0 },
//                     { $limit: 4 }
//                 ])
//             );
//         });
//     });
//     // test thứ tự toán tử trong pipeline
//     describe("pipeline order", () => {
//         it("pipeline phải đúng thứ tự", async () => {
//             (categoryService.getAllChildCategoryIds as jest.Mock) .mockResolvedValue(["categoryID1", "categoryID2"]);

//             await getProducts({ search: "iphone", status: "active", stock: "instock", category: "cat1", sort: "price-asc", page: "2", limit: "4" });

//             const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];
//             // phải search trước rồi mới match rồi mới đến facet
//             expect(pipeline[0]).toHaveProperty("$search");
//             expect(pipeline[1]).toHaveProperty("$match");
//             expect(pipeline[2]).toHaveProperty("$facet");

//             const facetStage = pipeline.find( (stage: any) => stage.$facet );
//             // phải có facet
//             expect(facetStage).toBeDefined();
//             // trong facet phải chạy 2 nhánh lấy ra products và đếm total
//             expect(facetStage.$facet).toHaveProperty("products");
//             expect(facetStage.$facet).toHaveProperty("total");

//             const products = facetStage.$facet.products;
//             // thứ tự toán tử trong products là sort rồi đến skip rồi mới limit, lookup và unwind, rồi mới project
//             expect(products[0]).toHaveProperty("$sort");
//             expect(products[1]).toHaveProperty("$skip");
//             expect(products[2]).toHaveProperty("$limit");
//             expect(products[3]).toHaveProperty("$lookup");
//             expect(products[4]).toHaveProperty("$unwind");
//             expect(products[5]).toHaveProperty("$project");
//         });
//     });
//     // test return theo chuẩn
//     describe("return shape", () => {
//         it("service phải trả về đúng data và meta", async () => {
//             const result = await getProducts({ page: "2", limit: "4" });

//             expect(result).toEqual({
//                 data: [{ title: "iphone" }],
//                 meta: {
//                     total: 10,
//                     page: 2,
//                     limit: 4,
//                     totalPages: 3
//                 }
//             });
//         });
//         // test khi không có sản phẩm thì phải trả về total = 0 và total page = 0
//         it("khi total rỗng thì phải trả về total=0 và totalPages=0", async () => {
//             mockAllowDiskUse.mockResolvedValue([ { products: [], total: [] } ]);

//             const result = await getProducts();

//             expect(result.meta.total).toBe(0);
//             expect(result.meta.totalPages).toBe(0);
//         });
//         // bắt buộc phải gọi allowDiskUse để tránh bị tràn bộ nhớ ram
//         it("phải gọi allowDiskUse(true)", async () => {
//             await getProducts();

//             expect(mockAllowDiskUse).toHaveBeenCalledWith(true);
//         });
//     });
// });
//test service updateProducts
describe("updateProductService", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (Product.findByIdAndUpdate as jest.Mock)
            .mockResolvedValue({
                _id: "productID",
                title: "xxx"
            });
    });
    describe("whitelist fields", () => {
        it("khi có nhiều field hợp lệ thì tất cả phải được đưa vào updateFields", async () => {
            await updateProductService( "productID", { title: "xxx", price: 1000, stock: 5, featured: true } );

            expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
                "productID",
                { title: "xxx", price: 1000, stock: 5, featured: true },
                { new: true, runValidators: true }
            );
        });
        it("khi có field ngoài whitelist thì không được update field đó", async () => {
            await updateProductService( "productID", { title: "xxx", hack: "yyy" } as any );

            expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
                "productID",
                expect.not.objectContaining({ hack: "yyy" }),
                { new: true, runValidators: true }
            );
        });
    });
    describe("sanitize html", () => {
        it("khi update description thì phải gọi sanitizeEditorContent và dùng kết quả trả về", async () => {
            await updateProductService( "productID", { title: "xxx", description: "<script>alert(1)</script>" } );

            expect(sanitizeEditorContent) .toHaveBeenCalledWith("<script>alert(1)</script>");
            expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
                "productID",
                expect.objectContaining({ description: "sanitized:<script>alert(1)</script>" }),
                { new: true, runValidators: true }
            );
        });
        it("khi update content thì phải gọi sanitizeEditorContent và dùng kết quả trả về", async () => {
            await updateProductService( "productID", { title: "xxx", content: "<script>alert(2)</script>" } );

            expect(sanitizeEditorContent) .toHaveBeenCalledWith( "<script>alert(2)</script>" );
            expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
                "productID",
                expect.objectContaining({ content: "sanitized:<script>alert(2)</script>" }),
                { new: true, runValidators: true }
            );
        });
        it("khi không có description/content thì không được gọi sanitizeEditorContent", async () => {
            await updateProductService( "productID", { title: "xxx" } );

            expect(sanitizeEditorContent) .not.toHaveBeenCalled();
        });

    });
    describe("database contract", () => {
        it("phải gọi findByIdAndUpdate với option new:true và runValidators:true", async () => {
            await updateProductService( "productID", { title: "xxx" } );

            expect(Product.findByIdAndUpdate)
                .toHaveBeenCalledWith(
                    "productID",
                    expect.any(Object),
                    { new: true, runValidators: true }
                );
        });

    });
    describe("return contract", () => {
        it("service phải trả về đúng message khi update thành công", async () => {
            const result = await updateProductService( "productID", { title: "xxx" } );

            expect(result).toEqual({ message: "Product updated successfully" });
        });

    });
    describe("error handling", () => {
        it("khi productID không tồn tại thì phải ném AppError 404", async () => {

            (Product.findByIdAndUpdate as jest.Mock) .mockResolvedValue(null);
            await expect(
                updateProductService(
                    "wrongID",
                    {
                        title: "xxx"
                    }
                )
            ).rejects.toMatchObject({
                statusCode: 404,
                message: "Product not found"
            });
        });
    });
});
// test product delete service
describe("deleteProductService", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (Product.findByIdAndUpdate as jest.Mock)
            .mockResolvedValue({
                _id: "productID",
                deleted: true
            });
    });
    describe("database contract", () => {
        it("phải soft delete product bằng deleted:true và có option {new: true}", async () => {
            await deleteProductService("productID");

            expect(Product.findByIdAndUpdate)
                .toHaveBeenCalledWith(
                    "productID",
                    { deleted: true },
                    { new: true }
                );
        });
    });
    describe("return contract", () => {
        it("service phải trả về đúng message khi delete thành công", async () => {
            const result = await deleteProductService( "productID" );

            expect(result).toEqual({ message: "Product deleted successfully" });
        });

    });
    describe("error handling", () => {
        it("khi productID không tồn tại thì phải ném AppError 404", async () => {
            (Product.findByIdAndUpdate as jest.Mock) .mockResolvedValue(null);

            await expect(
                deleteProductService("wrongID")
            ).rejects.toMatchObject({
                statusCode: 404,
                message: "Product not found"
            });
        });
    });
});
// test get product by id
describe("getProductByIDService", () => {
    let mockPopulate: jest.Mock;
    let mockLean: jest.Mock;
    beforeEach(() => {
        jest.clearAllMocks();
        mockLean = jest.fn().mockResolvedValue({
            _id: "productID",
            title: "iphone",
            product_category_id: {
                _id: "catID",
                title: "phone"
            }
        });
        mockPopulate = jest.fn().mockReturnValue({
            lean: mockLean
        });
        (Product.findOne as jest.Mock)
            .mockReturnValue({
                populate: mockPopulate
            });
    });
    describe("database contract", () => {
        it("phải gọi findOne với _id và deleted:false", async () => {
            await getProductByIDService("productID");

            expect(Product.findOne).toHaveBeenCalledWith({ _id: "productID", deleted: false });
        });
        it("phải populate product_category_id với _id và title", async () => {
            await getProductByIDService("productID");

            expect(mockPopulate).toHaveBeenCalledWith( "product_category_id", "_id title" );
        });

        it("phải gọi lean()", async () => {
            await getProductByIDService("productID");

            expect(mockLean).toHaveBeenCalled();
        });

    });
    describe("return contract", () => {
        it("service phải trả về đúng data", async () => {
            const result = await getProductByIDService( "productID" );

            expect(result).toEqual({
                data: {
                    _id: "productID",
                    title: "iphone",
                    product_category_id: {
                        _id: "catID",
                        title: "phone"
                    }
                }
            });
        });

    });

    describe("error handling", () => {

        it("khi product không tồn tại thì phải ném AppError 404", async () => {

            mockLean.mockResolvedValue(null);

            await expect(
                getProductByIDService("wrongID")
            ).rejects.toMatchObject({
                statusCode: 404,
                message: "Product not found"
            });
        });

    });

});
// test create product
describe("createProductService", () => {
    let mockSort: jest.Mock;
    let mockSelect: jest.Mock;
    beforeEach(() => {
        jest.clearAllMocks();

        (Product.create as jest.Mock)
            .mockResolvedValue({
                _id: "productID",
                title: "iphone"
            });

        mockSelect = jest.fn().mockResolvedValue({
            position: 10
        });

        mockSort = jest.fn().mockReturnValue({
            select: mockSelect
        });

        (Product.findOne as jest.Mock)
            .mockReturnValue({
                sort: mockSort
            });
    });
    describe("whitelist fields", () => {
        it("khi có nhiều field hợp lệ thì tất cả phải được đưa vào createFields", async () => {
            await createProductService({ title: "iphone", price: 1000, stock: 5, featured: true });

            expect(Product.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: "iphone",
                    price: 1000,
                    stock: 5,
                    featured: true
                })
            );
        });
        it("khi có field ngoài whitelist thì không được create field đó", async () => {
            await createProductService({ title: "iphone", price: 1000, hack: "xxx" } as any);

            expect(Product.create).toHaveBeenCalledWith(
                expect.not.objectContaining({
                    hack: "xxx"
                })
            );
        });
    });

    describe("position logic", () => {
        it("khi không truyền position thì phải tự tăng position", async () => {
            await createProductService({
                title: "iphone",
                price: 1000
            });

            expect(Product.findOne).toHaveBeenCalledWith({});
            expect(mockSort).toHaveBeenCalledWith({ position: -1 });
            expect(mockSelect).toHaveBeenCalledWith( "position" );
            expect(Product.create).toHaveBeenCalledWith( expect.objectContaining({ position: 11 }) );
        });
        it("khi truyền position thì không được tự generate position", async () => {

            await createProductService({ title: "iphone", price: 1000, position: 99 });

            expect(Product.findOne) .not.toHaveBeenCalled();
            expect(Product.create).toHaveBeenCalledWith( expect.objectContaining({ position: 99 }) );
        });

    });

    describe("sanitize html", () => {
        it("khi có description thì phải sanitize trước khi create", async () => {
            await createProductService({ title: "iphone", price: 1000, description: "<script>alert(1)</script>" });

            expect(sanitizeEditorContent).toHaveBeenCalledWith( "<script>alert(1)</script>" );
            expect(Product.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    description:
                        "sanitized:<script>alert(1)</script>"
                })
            );
        });
        it("khi có content thì phải sanitize trước khi create", async () => {
            await createProductService({ title: "iphone", price: 1000, content: "<script>alert(2)</script>" });

            expect(sanitizeEditorContent) .toHaveBeenCalledWith( "<script>alert(2)</script>" );
            expect(Product.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    content:
                        "sanitized:<script>alert(2)</script>"
                })
            );
        });
        it("khi không có description/content thì không được gọi sanitizeEditorContent", async () => {
            await createProductService({ title: "iphone", price: 1000 });

            expect(sanitizeEditorContent) .not.toHaveBeenCalled();
        });

    });
    describe("return contract", () => {
        it("service phải trả về đúng message khi create thành công", async () => {
            const result = await createProductService({ title: "iphone", price: 1000 });

            expect(result).toEqual({ message: "Product created successfully" });
        });

    });
    describe("error handling", () => {
        it("khi create product thất bại thì phải ném AppError 500", async () => {
            (Product.create as jest.Mock) .mockResolvedValue(null);

            await expect(
                createProductService({
                    title: "iphone",
                    price: 1000
                })
            ).rejects.toMatchObject({
                statusCode: 500,
                message:
                    "Failed to create product"
            });
        });
    });

});

import Product from "../../models/product.model";
import { getProducts } from "../../services/admin/products.service";
import * as categoryService from "../../services/admin/productCategories.service";

jest.mock("../../models/product.model", () => ({
    __esModule: true,
    default: {
        aggregate: jest.fn()
    }
}));

jest.mock("../../services/admin/productCategories.service", () => ({
    __esModule: true,
    getAllChildCategoryIds: jest.fn()
}));

describe("getProducts", () => {
    let mockAllowDiskUse: jest.Mock;
    beforeEach(() => {
        jest.clearAllMocks();

        mockAllowDiskUse = jest.fn().mockResolvedValue([
            {
                products: [{ title: "iphone" }],
                total: [{ count: 10 }]
            }
        ]);
        (Product.aggregate as jest.Mock).mockReturnValue({
            allowDiskUse: mockAllowDiskUse
        });
    });
    //test search
    describe("search", () => {
        it("Khi truyền search vào query thì pipeline phải có $search", async () => {
            await getProducts({ search: "iphone" });

            expect(Product.aggregate).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        $search: {
                            index: "default",
                            text: {
                                query: "iphone",
                                path: ["title", "slug"]
                            }
                        }
                    })
                ])
            );
        });

        it("Khi không truyền search thì pipeline không được có $search", async () => {
            await getProducts({ status: "active" });

            const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];

            expect( pipeline.find((stage: any) => stage.$search) ).toBeUndefined();
        });
    });
    //test filter
    describe("filter", () => {
        it("khi truyền status, stock, category thì phải build đúng $match", async () => {
            (categoryService.getAllChildCategoryIds as jest.Mock) .mockResolvedValue(["categoryID1", "categoryID2"]);

            await getProducts({ status: "active", stock: "instock", category: "categoryID1" });

            expect(Product.aggregate).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        $match: {
                            deleted: false,
                            status: "active",
                            stock: { $gt: 0 },
                            product_category_id: { $in: ["categoryID1", "categoryID2"] }
                        }
                    })
                ])
            );
        });

        it("khi stock=outofstock thì phải filter stock = 0", async () => {
            await getProducts({ stock: "outofstock" });

            expect(Product.aggregate).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        $match: { deleted: false, stock: 0 }
                    })
                ])
            );
        });

        it("khi không truyền filter thì $match chỉ có deleted:false", async () => {
            await getProducts();

            expect(Product.aggregate).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        $match: {
                            deleted: false
                        }
                    })
                ])
            );
        });
    });
    //test sort
    describe("sort", () => {
        test.each([ 
            ["price-asc", { price: 1 }],
            ["price-desc", { price: -1 }],
            ["stock-asc", { stock: 1 }],
            ["stock-desc", { stock: -1 }],
            ["created-asc", { createdAt: 1 }],
            ["created-desc", { createdAt: -1 }],
            ["position-asc", { position: 1 }],
            ["macdinh", { position: -1 }]
        ])("sort=%s phải tạo đúng $sort", async (sort, expected) => {
            await getProducts({sort});
            const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];
            const facetStage = pipeline.find((stage: any) => stage.$facet);
            expect(facetStage.$facet.products).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        $sort: expected
                    })
                ])
            );
        })

        it("khi không truyền sort thì phải sort mặc định theo position giảm dần", async () => {
            await getProducts();

            const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];

            const facetStage = pipeline.find( (stage: any) => stage.$facet );

            expect(facetStage.$facet.products).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        $sort: { position: -1 }
                    })
                ])
            );
        });
    });
    // test pagination
    describe("pagination", () => {
        it("khi truyền page và limit thì phải có $skip và $limit", async () => {
            await getProducts({ page: "2", limit: "4" });

            const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];

            const facetStage = pipeline.find( (stage: any) => stage.$facet );

            expect(facetStage.$facet.products).toEqual(
                expect.arrayContaining([
                    { $skip: 4 },
                    { $limit: 4 }
                ])
            );
        });

        it("khi không truyền page và limit thì phải dùng giá trị mặc định", async () => {
            await getProducts();

            const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];

            const facetStage = pipeline.find( (stage: any) => stage.$facet );

            expect(facetStage.$facet.products).toEqual(
                expect.arrayContaining([
                    { $skip: 0 },
                    { $limit: 4 }
                ])
            );
        });
    });
    // test thứ tự toán tử trong pipeline
    describe("pipeline order", () => {
        it("pipeline phải đúng thứ tự", async () => {
            (categoryService.getAllChildCategoryIds as jest.Mock) .mockResolvedValue(["categoryID1", "categoryID2"]);

            await getProducts({ search: "iphone", status: "active", stock: "instock", category: "cat1", sort: "price-asc", page: "2", limit: "4" });

            const pipeline = (Product.aggregate as jest.Mock).mock.calls[0][0];
            // phải search trước rồi mới match rồi mới đến facet
            expect(pipeline[0]).toHaveProperty("$search");
            expect(pipeline[1]).toHaveProperty("$match");
            expect(pipeline[2]).toHaveProperty("$facet");

            const facetStage = pipeline.find( (stage: any) => stage.$facet );
            // phải có facet
            expect(facetStage).toBeDefined();
            // trong facet phải chạy 2 nhánh lấy ra products và đếm total
            expect(facetStage.$facet).toHaveProperty("products");
            expect(facetStage.$facet).toHaveProperty("total");

            const products = facetStage.$facet.products;
            // thứ tự toán tử trong products là sort rồi đến skip rồi mới limit, lookup và unwind, rồi mới project
            expect(products[0]).toHaveProperty("$sort");
            expect(products[1]).toHaveProperty("$skip");
            expect(products[2]).toHaveProperty("$limit");
            expect(products[3]).toHaveProperty("$lookup");
            expect(products[4]).toHaveProperty("$unwind");
            expect(products[5]).toHaveProperty("$project");
        });
    });
    // test return theo chuẩn
    describe("return shape", () => {
        it("service phải trả về đúng data và meta", async () => {
            const result = await getProducts({ page: "2", limit: "4" });

            expect(result).toEqual({
                data: [{ title: "iphone" }],
                meta: {
                    total: 10,
                    page: 2,
                    limit: 4,
                    totalPages: 3
                }
            });
        });
        // test khi không có sản phẩm thì phải trả về total = 0 và total page = 0
        it("khi total rỗng thì phải trả về total=0 và totalPages=0", async () => {
            mockAllowDiskUse.mockResolvedValue([ { products: [], total: [] } ]);

            const result = await getProducts();

            expect(result.meta.total).toBe(0);
            expect(result.meta.totalPages).toBe(0);
        });
        // bắt buộc phải gọi allowDiskUse để tránh bị tràn bộ nhớ ram
        it("phải gọi allowDiskUse(true)", async () => {
            await getProducts();

            expect(mockAllowDiskUse).toHaveBeenCalledWith(true);
        });
    });
});
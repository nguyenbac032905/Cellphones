import mongoose from "mongoose";
import Product from "../../models/product.model";
import { getProductDeleted, restoreProductService, forceProductService } from "../../services/admin/recycleBin.service";
import { AppError } from "../../utils/AppError";

jest.mock("../../models/product.model", () => ({
    __esModule: true,
    default: {
        find: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        deleteOne: jest.fn()
    }
}));

describe("recycle-bin.service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getProductDeleted", () => {

        it("phải gọi Product.find với deleted: true", async () => {
            const mockSelect = jest.fn().mockResolvedValue([
                {
                    _id: new mongoose.Types.ObjectId(),
                    title: "iPhone 15"
                }
            ]);

            (Product.find as jest.Mock).mockReturnValue({
                select: mockSelect
            });

            await getProductDeleted();

            expect(Product.find).toHaveBeenCalledWith({
                deleted: true
            });

            expect(mockSelect).toHaveBeenCalledWith(
                "-content -description -product_category_id"
            );
        });

        it("phải trả về danh sách sản phẩm đã xóa", async () => {
            const products = [
                {
                    _id: new mongoose.Types.ObjectId(),
                    title: "iPhone 15"
                }
            ];

            const mockSelect = jest.fn().mockResolvedValue(products);

            (Product.find as jest.Mock).mockReturnValue({
                select: mockSelect
            });

            const result = await getProductDeleted();

            expect(result).toEqual({
                data: products
            });
        });

        it("khi không có sản phẩm nào vẫn phải trả về data rỗng", async () => {
            const mockSelect = jest.fn().mockResolvedValue([]);

            (Product.find as jest.Mock).mockReturnValue({
                select: mockSelect
            });

            const result = await getProductDeleted();

            expect(result).toEqual({
                data: []
            });
        });
    });

    describe("restoreProductService", () => {

        it("phải restore product thành công", async () => {
            const productID = new mongoose.Types.ObjectId().toString();

            (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue({
                _id: productID,
                deleted: false
            });

            const result = await restoreProductService(productID);

            expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
                productID,
                {
                    deleted: false,
                    deletedAt: null
                },
                {
                    new: true
                }
            );

            expect(result).toEqual({
                message: "Product restored successfully"
            });
        });

        it("khi product không tồn tại thì phải throw AppError 404", async () => {
            const productID = new mongoose.Types.ObjectId().toString();

            (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

            await expect(
                restoreProductService(productID)
            ).rejects.toThrow(AppError);

            await expect(
                restoreProductService(productID)
            ).rejects.toMatchObject({
                message: "Product not found",
                statusCode: 404
            });
        });
    });

    describe("forceProductService", () => {

        it("phải xóa vĩnh viễn product thành công", async () => {
            const productID = new mongoose.Types.ObjectId().toString();

            (Product.deleteOne as jest.Mock).mockResolvedValue({
                deletedCount: 1
            });

            const result = await forceProductService(productID);

            expect(Product.deleteOne).toHaveBeenCalledWith({
                _id: productID
            });

            expect(result).toEqual({
                message: "Product deleted permanently successfully"
            });
        });

        it("khi product không tồn tại thì phải throw AppError 404", async () => {
            const productID = new mongoose.Types.ObjectId().toString();

            (Product.deleteOne as jest.Mock).mockResolvedValue({
                deletedCount: 0
            });

            await expect(
                forceProductService(productID)
            ).rejects.toThrow(AppError);

            await expect(
                forceProductService(productID)
            ).rejects.toMatchObject({
                message: "Product not found",
                statusCode: 404
            });
        });
    });
});
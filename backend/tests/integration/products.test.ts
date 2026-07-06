import request from "supertest";
import app from "../../app";
import Product from "../../models/product.model";
import { connectTestDB, closeTestDB, clearTestDB } from "../setup/setup";
import { getAuthToken } from "../helpers/auth.helper";

let token: string;
beforeAll(async () => {
  await connectTestDB();
  token = await getAuthToken(app); // chỉ đăng ký 1 lần cho toàn bộ file
});
afterEach(clearTestDB);
afterAll(closeTestDB);

const PREFIX = "/admin/api/products";

describe("Products integration", () => {

    beforeEach(async () => {
        await Product.create([
            { title: "iPhone 15", price: 20000000, stock: 5, status: "active", position: 1 },
            { title: "Samsung S24", price: 18000000, stock: 0, status: "active", position: 2 },
            { title: "Xiaomi 14", price: 10000000, stock: 3, status: "inactive", position: 3 },
        ]);
    });

    // ------------------------------------------------------------------
    // Nguyên tắc: các nhánh business rule của filter/sort/search/pagination
    // (switch-case, điều kiện stock/status/category, thứ tự pipeline...)
    // đã được cover đầy đủ bằng unit test (product.service.test.ts) với
    // aggregate được mock. Ở integration test, KHÔNG lặp lại từng nhánh đó
    // nữa (không có giá trị tăng thêm, chỉ tốn thời gian bảo trì gấp đôi).
    // Integration test ở đây chỉ trả lời 1 câu hỏi duy nhất:
    // "Toàn bộ chuỗi route -> middleware -> controller -> service -> MongoDB
    // thật có thực sự nối được với nhau và trả đúng shape không?"
    // ------------------------------------------------------------------

    describe("GET /admin/api/products", () => {
        // test xem có chạy qua authMiddleware thật không (không mock được ở unit test)
        it("không có token -> 401", async () => {
            const res = await request(app).get(PREFIX);
            expect(res.status).toBe(401);
        });

        it("có token hợp lệ -> 200 + đúng shape {data, meta}", async () => {
            const res = await request(app).get(PREFIX).set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.meta).toBeDefined();
            expect(res.body.data.length).toBe(3);
        });

        // 1 test "smoke" duy nhất xác nhận query string thật sự được Express
        // parse và truyền tới service (wiring), không test lại từng nhánh logic
        // filter/sort/pagination vì đã có unit test riêng cho từng nhánh đó rồi.
        it("query string (filter + sort + pagination) được truyền tới service và chạy được trên MongoDB thật", async () => {
            const res = await request(app)
                .get(`${PREFIX}?status=active&stock=outofstock&sort=price-asc&page=1&limit=1`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(1);
            expect(res.body.data[0].title).toBe("Samsung S24");
        });
    });

    describe("POST /admin/api/products", () => {
        it("thiếu field bắt buộc -> 400 (validateMiddleware thật)", async () => {
            const res = await request(app)
                .post(PREFIX)
                .set("Authorization", `Bearer ${token}`)
                .send({ title: "" });
            expect(res.status).toBe(400);
        });

        it("hợp lệ -> 201 và thực sự lưu vào DB", async () => {
            const res = await request(app)
                .post(PREFIX)
                .set("Authorization", `Bearer ${token}`)
                .send({ title: "Oppo Reno", price: 8000000 });

            expect(res.status).toBe(201);
            const inDb = await Product.findOne({ title: "Oppo Reno" });
            expect(inDb).not.toBeNull();
            expect(inDb!.price).toBe(8000000);
        });
    });

    describe("GET /admin/api/products/:productID", () => {
        it("productID sai định dạng -> 400", async () => {
            const res = await request(app)
                .get(`${PREFIX}/invalid-id`)
                .set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(400);
        });

        it("productID không tồn tại -> 404", async () => {
            const res = await request(app)
                .get(`${PREFIX}/64f000000000000000000000`)
                .set("Authorization", `Bearer ${token}`);
            expect(res.status).toBe(404);
        });
    });

    describe("PATCH /admin/api/products/:productID", () => {
        it("cập nhật trạng thái sản phẩm thành công", async () => {
            const product = await Product.findOne({ title: "iPhone 15" });
            const res = await request(app)
                .patch(`${PREFIX}/${product!._id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ status: "inactive" });

            expect(res.status).toBe(200);
            const updated = await Product.findById(product!._id);
            expect(updated!.status).toBe("inactive");
        });
    });

    describe("DELETE /admin/api/products/:productID", () => {
        it("soft delete đánh dấu deleted=true, không xoá hẳn khỏi DB", async () => {
            const product = await Product.findOne({ title: "iPhone 15" });
            const res = await request(app)
                .delete(`${PREFIX}/${product!._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            const deleted = await Product.findById(product!._id);
            expect(deleted!.deleted).toBe(true);
        });
    });
});
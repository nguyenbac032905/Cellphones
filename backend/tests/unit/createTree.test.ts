import mongoose from "mongoose";
import { createTree, findChildCategoryIds } from "../../helpers/createTree";

const makeCategory = (
    id: string,
    parentId: string | null = null,
    extra: Record<string, any> = {}
) => ({
    _id: new mongoose.Types.ObjectId(id),
    parent_id: parentId ? new mongoose.Types.ObjectId(parentId) : null,
    ...extra
});

const ROOT_A = "507f1f77bcf86cd799439011";
const CHILD_B = "507f1f77bcf86cd799439012";
const GRANDCHILD_C = "507f1f77bcf86cd799439013";
const ROOT_D = "507f1f77bcf86cd799439014";
const ORPHAN_E = "507f1f77bcf86cd799439015";

describe("createTree", () => {
    it("mảng category rỗng thì trả về []", () => {
        expect(createTree([])).toEqual([]);
    });

    it("category không có parent_id (root) thì nằm ở tầng cao nhất với children rỗng", () => {
        const categories = [makeCategory(ROOT_A, null, { title: "Điện thoại" })];

        const tree = createTree(categories);

        expect(tree).toHaveLength(1);
        expect(tree[0].title).toBe("Điện thoại");
        expect(tree[0].children).toEqual([]);
    });

    it("phải dựng đúng cây lồng nhau nhiều cấp (ông -> cha -> con)", () => {
        const categories = [
            makeCategory(ROOT_A, null, { title: "Điện thoại" }),
            makeCategory(CHILD_B, ROOT_A, { title: "iPhone" }),
            makeCategory(GRANDCHILD_C, CHILD_B, { title: "iPhone 15" })
        ];

        const tree = createTree(categories);

        expect(tree).toHaveLength(1);
        expect(tree[0].title).toBe("Điện thoại");
        expect(tree[0].children).toHaveLength(1);
        expect(tree[0].children[0].title).toBe("iPhone");
        expect(tree[0].children[0].children).toHaveLength(1);
        expect(tree[0].children[0].children[0].title).toBe("iPhone 15");
        expect(tree[0].children[0].children[0].children).toEqual([]);
    });

    it("giữ nguyên các field khác của category (title, slug...) ngoài _id/parent_id/children", () => {
        const categories = [
            makeCategory(ROOT_A, null, { title: "Điện thoại", slug: "dien-thoai", status: "active" })
        ];

        const tree = createTree(categories);

        expect(tree[0]).toMatchObject({
            title: "Điện thoại",
            slug: "dien-thoai",
            status: "active"
        });
    });

    it("category có nhiều con cùng cấp (siblings) thì đều xuất hiện, giữ đúng thứ tự trong mảng gốc", () => {
        const categories = [
            makeCategory(ROOT_A, null, { title: "Điện thoại" }),
            makeCategory(CHILD_B, ROOT_A, { title: "Samsung" }),
            makeCategory(GRANDCHILD_C, ROOT_A, { title: "Xiaomi" })
        ];

        const tree = createTree(categories);

        expect(tree[0].children.map((c) => c.title)).toEqual(["Samsung", "Xiaomi"]);
    });

    it("category có parent_id trỏ tới _id không tồn tại (dữ liệu mồ côi) thì không xuất hiện ở đâu cả, không crash", () => {
        const categories = [
            makeCategory(ROOT_A, null, { title: "Điện thoại" }),
            makeCategory(ORPHAN_E, "000000000000000000000099", { title: "Mồ côi" })
        ];

        const tree = createTree(categories);

        expect(tree).toHaveLength(1);
        expect(tree[0].title).toBe("Điện thoại");
        // "Mồ côi" không nằm trong cây vì parent_id của nó không khớp với bất kỳ _id nào
        expect(JSON.stringify(tree)).not.toContain("Mồ côi");
    });

    it("nhiều category root độc lập (không cùng cha) đều nằm ở tầng cao nhất", () => {
        const categories = [
            makeCategory(ROOT_A, null, { title: "Điện thoại" }),
            makeCategory(ROOT_D, null, { title: "Laptop" })
        ];

        const tree = createTree(categories);

        expect(tree.map((c) => c.title)).toEqual(["Điện thoại", "Laptop"]);
    });
});

describe("findChildCategoryIds", () => {
    it("category không có con thì trả về mảng chỉ gồm chính id đó", () => {
        const categories = [makeCategory(ROOT_A, null)];

        const result = findChildCategoryIds(categories, ROOT_A);

        expect(result).toHaveLength(1);
        expect(result[0].toString()).toBe(ROOT_A);
    });

    it("phải lấy đủ toàn bộ id con cháu qua nhiều cấp (cha -> con -> cháu)", () => {
        const categories = [
            makeCategory(ROOT_A, null),
            makeCategory(CHILD_B, ROOT_A),
            makeCategory(GRANDCHILD_C, CHILD_B)
        ];

        const result = findChildCategoryIds(categories, ROOT_A);
        const resultAsStrings = result.map((id) => id.toString());

        expect(resultAsStrings).toEqual(
            expect.arrayContaining([ROOT_A, CHILD_B, GRANDCHILD_C])
        );
        expect(resultAsStrings).toHaveLength(3);
    });

    it("không lấy nhầm category KHÔNG phải con cháu (sibling khác nhánh)", () => {
        const categories = [
            makeCategory(ROOT_A, null),
            makeCategory(CHILD_B, ROOT_A),
            makeCategory(ROOT_D, null) // root khác, không liên quan tới ROOT_A
        ];

        const result = findChildCategoryIds(categories, ROOT_A);
        const resultAsStrings = result.map((id) => id.toString());

        expect(resultAsStrings).not.toContain(ROOT_D);
    });

    it("mọi phần tử trả về phải là instance của mongoose.Types.ObjectId (không phải string)", () => {
        const categories = [makeCategory(ROOT_A, null), makeCategory(CHILD_B, ROOT_A)];

        const result = findChildCategoryIds(categories, ROOT_A);

        result.forEach((id) => {
            expect(id).toBeInstanceOf(mongoose.Types.ObjectId);
        });
    });

    it("khi parentId truyền vào không tồn tại trong danh sách category thì vẫn trả về mảng chỉ gồm chính id đó, không throw", () => {
        const categories = [makeCategory(ROOT_A, null)];
        const notExistId = "000000000000000000000099";

        const result = findChildCategoryIds(categories, notExistId);

        expect(result).toHaveLength(1);
        expect(result[0].toString()).toBe(notExistId);
    });

    it("khi parentId không đúng định dạng ObjectId (không phải 12 byte/24 hex) thì phải throw lỗi", () => {
        const categories = [makeCategory(ROOT_A, null)];

        expect(() => findChildCategoryIds(categories, "invalid-id")).toThrow();
    });

    it("danh sách category rỗng thì chỉ trả về chính parentId, không lỗi", () => {
        const result = findChildCategoryIds([], ROOT_A);

        expect(result).toHaveLength(1);
        expect(result[0].toString()).toBe(ROOT_A);
    });
});

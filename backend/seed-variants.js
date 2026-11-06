// Chạy:  mongosh "$MONGO_URL" seed-variants.js
// Xem thử không ghi:  DRY_RUN=1 mongosh "$MONGO_URL" seed-variants.js
// (MONGO_URL lấy từ .env, KHÔNG ghi mật khẩu vào file này)

const DRY_RUN = process.env.DRY_RUN === "1";
const STOCK = 100;
const BRANCH_IDS = [ObjectId("6adbccf849367b92c7ab4e0a")]; // Chi nhánh Hà Nội. Thêm id khác nếu muốn tồn kho ở nhiều chi nhánh

// Phone: 128GB / 256GB. Laptop: 512GB / 1TB
const STORAGES = { phone: ["128GB", "256GB"], laptop: ["512GB", "1TB"] };

// Mỗi sản phẩm 1 màu. Sửa tại đây nếu muốn đúng màu trong ảnh (key = title).
const DEFAULT_COLOR = { phone: "Đen", laptop: "Xám" };
const COLOR_BY_TITLE = {
    // "Iphone Air": "Vàng nhạt",
};

const slugify = (s) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d")
        .replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toUpperCase();

const skuStorage = (s) => s.replace("GB", "");
const upPrice = (p) => Math.max(p, Math.round((p * 1.13) / 1000) * 1000); // gần với mức chênh trong data hiện có

const db = db.getSiblingDB("Cellphones");
const now = new Date();
let variants = 0, inventories = 0, skipped = [];

db.products.find({ deleted: { $ne: true } }).forEach((p) => {
    // bỏ qua sản phẩm đã có variant (kể cả variant cũ bị lưu product_id sai kiểu)
    const exists = db.product_variants.countDocuments({
        $or: [{ product_id: p._id }, { "product_id.$oid": p._id.toString() }],
    });
    if (exists) { skipped.push(p.title); return; }

    const kind = /laptop/i.test(p.title) ? "laptop" : "phone";
    const color = COLOR_BY_TITLE[p.title] || DEFAULT_COLOR[kind];
    const main = (p.images || []).find((i) => i.isMain) || (p.images || [])[0];
    const prefix = p._id.toString().slice(0, 8).toUpperCase();

    STORAGES[kind].forEach((storage, idx) => {
        const v = {
            _id: new ObjectId(),
            product_id: p._id, // ObjectId thật
            sku: `SP-${prefix}-${slugify(color)}-${skuStorage(storage)}`,
            attributes: { color, storage },
            price: idx === 0 ? p.price : upPrice(p.price),
            images: main ? [{ url: main.url, isMain: true }] : [],
            sold: 0,
            status: "active",
            position: idx + 1,
            deleted: false,
            createdAt: now, // Date thật
            updatedAt: now,
        };
        const invs = BRANCH_IDS.map((b) => ({
            variant_id: v._id, branch_id: b, stock: STOCK, createdAt: now, updatedAt: now,
        }));
        if (!DRY_RUN) {
            db.product_variants.insertOne(v);
            db.inventories.insertMany(invs);
        }
        variants++; inventories += invs.length;
        print(`${DRY_RUN ? "[dry] " : ""}${p.title} -> ${v.sku} | ${color} | ${storage} | ${v.price}`);
    });
});

print(`\nVariants: ${variants}, inventories: ${inventories}. Bỏ qua (đã có variant): ${skipped.join(", ") || "-"}`);
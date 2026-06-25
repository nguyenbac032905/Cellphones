export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD") // tách dấu tiếng Việt
        .replace(/[\u0300-\u036f]/g, "") // xóa dấu
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
        .trim()
        .replace(/\s+/g, "-") // khoảng trắng -> dấu -
        .replace(/-+/g, "-"); // gộp nhiều dấu - liên tiếp
}
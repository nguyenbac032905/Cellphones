// data.js
export const categories = [
  { id: 1, label: "Điện thoại, Tablet", items: [{ text: "Điện thoại", href: "/mobile.html" }, { text: "Tablet", href: "/tablet.html" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-mobile.svg" },
  { id: 2, label: "Laptop", items: [{ text: "Laptop", href: "/laptop.html" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-laptop.svg", singleLink: "/laptop.html" },
  { id: 3, label: "Âm thanh, Mic thu âm", items: [{ text: "Âm thanh", href: "/thiet-bi-am-thanh.html" }, { text: "Mic thu âm", href: "/thiet-bi-am-thanh/micro-thu-am.html" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-audio-2.svg" },
  { id: 4, label: "Đồng hồ, Camera", items: [{ text: "Đồng hồ", href: "/do-choi-cong-nghe.html" }, { text: "Camera", href: "/phu-kien/camera.html" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-watch.svg" },
  { id: 5, label: "Đồ gia dụng", items: [{ text: "Đồ gia dụng", href: "/do-gia-dung.html" }, { text: "Làm đẹp", href: "/nha-thong-minh/suc-khoe-lam-dep.html" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-home-appliances.svg" },
  { id: 6, label: "Phụ kiện", items: [{ text: "Phụ kiện", href: "/phu-kien.html" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-accessories.svg", singleLink: "/phu-kien.html" },
  { id: 7, label: "PC, Màn hình, Máy in", items: [{ text: "PC", href: "/may-tinh-de-ban.html" }, { text: "Màn hình", href: "/man-hinh.html" }, { text: "Máy in", href: "/may-in.html" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-pc.svg" },
  { id: 8, label: "Tivi, Điện máy", items: [{ text: "Tivi", href: "/tivi.html" }, { text: "Điện máy", href: "/dien-may.html" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-tv.svg" },
  { id: 9, label: "Thu cũ đổi mới", items: [{ text: "Thu cũ đổi mới", href: "/thu-cu-doi-moi" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-trade-in.svg", singleLink: "/thu-cu-doi-moi" },
  { id: 10, label: "Hàng cũ", items: [{ text: "Hàng cũ", href: "/hang-cu.html" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-used-goods.svg", singleLink: "/hang-cu.html" },
  { id: 11, label: "Khuyến mãi", items: [{ text: "Khuyến mãi", href: "/danh-sach-khuyen-mai" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-promotions.svg", singleLink: "/danh-sach-khuyen-mai" },
  { id: 12, label: "Tin công nghệ", items: [{ text: "Tin công nghệ", href: "/sforum" }], icon: "https://dashboard.cellphones.com.vn/storage/icon-homepage-tech-news.svg", singleLink: "/sforum" }
];

export const banners = [
  { title: "GALAXY GẬP MỚI", desc: "Đăng ký nhận tin", image: "https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/Home-z8.png", href: "/dien-thoai-samsung-galaxy-gap-moi.html" },
  { title: "IPHONE 17 PRO MAX", desc: "Cam kết giá thu", image: "https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/690x300_BUYBACK.png", href: "/goi-cam-ket-gia-thu-s-buyback" },
  { title: "OPPO RENO16 F 5G", desc: "Mở bán tặng quà khủng", image: "https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/OppoReno16F_home_open.png", href: "/dien-thoai-oppo-reno16-f.html" },
  { title: "THU CŨ BALO", desc: "Nhận ngay voucher 25%", image: "https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/chuong-trinh-thu-cu-balo-tui-xach-doi-voucher-giam-25-home.jpg", href: "/chuong-trinh-thu-cu-balo-tui-xach-doi-voucher-giam-25" },
  { title: "XIAOMI 17T | 17T PRO", desc: "Bậc thầy Telephoto - Mua ngay", image: "https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/xiaomi-17t-home-0726.jpg", href: "/dien-thoai-xiaomi-17t.html" },
  { title: "GALAXY S26 ULTRA", desc: "Siêu Phẩm AI Galaxy", image: "https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/Homes2622.png", href: "/dien-thoai-samsung-galaxy-s26-ultra.html" },
  { title: "TAI NGHE LIBERTY 5 PRO SERIES", desc: "Mở bán giá hấp dẫn", image: "https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/tai-nghe-khong-day-anker-soundcore-liberty-5-pro.jpg", href: "/tai-nghe-khong-day-anker-soundcore-liberty-5-pro.html" },
  { title: "MUA PIN CỦ CÁP", desc: "Deal tốt, ưu đãi ngon", image: "https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/pin-cu-cap-bao-lu-home.png", href: "/khuyen-mai-pin-tram-sac-du-phong" }
];

export const rightBanners = [
  { img: "https://media-asset.cellphones.com.vn/dashboard-v1/mbannnmacpro.png", href: "/laptop/mac/macbook-pro.html?laptop_cpu=apple-m5-pro,apple-m5-max", alt: "macbook pro m5" },
  { img: "https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/a37-0726.png", href: "/dien-thoai-samsung-galaxy-a37.html", alt: "Samsung Galaxy A37" },
  { img: "https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/Artboard5.png", href: "/laptop.html", alt: "B2S Laptop" }
];

export const mobileQuickLinks = [
  { text: "Deal sốc đến 50%", href: "/danh-sach-khuyen-mai", icon: "https://cdn2.cellphones.com.vn/x/media/wysiwyg/Web/icon/icon-hang-moi-ve02.png" },
  { text: "Ưu đãi cho giáo dục", href: "/uu-dai-sinh-vien-hoc-sinh", icon: "https://cellphones.com.vn/media/wysiwyg/icon_edu_promotion_home_190825.png" },
  { text: "Thu cũ đổi mới giá hời", href: "/thu-cu-doi-moi", icon: "https://cellphones.com.vn/media/wysiwyg/icon_edu_promotion_home_190825.png" } // Thay bằng icon phù hợp
];

// types/home.ts

export type CategoryItem = {
    text: string;
    href: string;
};

export type CategoryBanner = {
    id: number;
    label: string;
    items: CategoryItem[];
    icon: string;
    singleLink?: string;
};

export type Banner = {
    title: string;
    desc: string;
    image: string;
    href: string;
};

export type RightBanner = {
    img: string;
    href: string;
    alt: string;
};

export type MobileQuickLink = {
    text: string;
    href: string;
    icon: string;
};
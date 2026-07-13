import React, { useState, useRef, useMemo } from "react";
// Import Swiper React components và modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface BannerItem {
    id: number;
    title: string;
    subtitle: string;
    imageUrl: string;
    link: string;
}

const BANNER_DATA: BannerItem[] = [
    {
        id: 0,
        title: "GALAXY GẬP MỚI",
        subtitle: "Đăng ký nhận tin",
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/Home-z8.png",
        link: "/dien-thoai-samsung-galaxy-gap-moi.html"
    },
    {
        id: 1,
        title: "IPHONE 17 PRO MAX",
        subtitle: "Cam kết giá thu",
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/690x300_BUYBACK.png",
        link: "/goi-cam-ket-gia-thu-s-buyback"
    },
    {
        id: 2,
        title: "OPPO RENO16 F 5G",
        subtitle: "Mở bán tặng quà khủng",
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/OppoReno16F_home_open.png",
        link: "/dien-thoai-oppo-reno16-f.html"
    },
    {
        id: 3,
        title: "THU CŨ BALO",
        subtitle: "Nhận ngay voucher 25%",
        imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/chuong-trinh-thu-cu-balo-tui-xach-doi-voucher-giam-25-home.jpg",
        link: "/chuong-trinh-thu-cu-balo-tui-xach-doi-voucher-giam-25"
    }
];

const SliddingBanner: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const swiperRef = useRef<SwiperType | null>(null);

    // Xử lý khi nhấn vào Tab cố định phía trên bằng cách sử dụng slideToLoop để hoạt động đúng khi loop={true}
    const handleTabClick = (index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(index);
        }
    };

    // Tối ưu hóa SVG Tai Mèo bằng useMemo để không bị tính toán hay re-render lại cấu trúc path phức tạp
    const leftEarSvg = useMemo(() => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1362" className="h-full w-full" preserveAspectRatio="none">
            <path d="M 0 678.441 L 0 1355.877 4.698 1356.582 C 11.713 1357.634, 49.378 1356.255, 58.142 1354.625 C 75.112 1351.470, 113.306 1338.882, 134.500 1329.459 C 183.168 1307.823, 221.770 1285.436, 260.997 1256.099 C 280.057 1241.844, 298.425 1225.449, 328.826 1195.554 C 362.127 1162.808, 385.286 1133.566, 407.670 1096 C 427.019 1063.527, 430.431 1056.966, 447.458 1019.500 C 460.942 989.828, 464.472 978.257, 483.609 901 C 498.035 842.766, 549.729 636.436, 554.012 620 C 572.473 549.145, 592.445 478.080, 606.847 432 C 622.391 382.262, 630.945 362.446, 654.762 321 C 689.890 259.869, 708.840 234.684, 755.500 187.112 C 804.088 137.573, 860.800 92.593, 909.500 64.967 C 927.984 54.482, 991.312 21.173, 1017.500 8.161 L 1023.500 5.180 1024.001 680.340 L 1024.502 1355.500 1024.751 678 L 1025 0.500 512.500 0.752 L 0 1.004 0 678.441 M 0.497 678.500 C 0.497 1051.400, 0.611 1204.100, 0.750 1017.832 C 0.889 831.565, 0.889 526.465, 0.750 339.832 C 0.611 153.200, 0.497 305.600, 0.497 678.500" fill="#f2f2f3"></path>
        </svg>
    ), []);

    const rightEarSvg = useMemo(() => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1362" className="h-full w-full" preserveAspectRatio="none">
            <path d="M 0 678.441 L 0 1355.877 4.698 1356.582 C 11.713 1357.634, 49.378 1356.255, 58.142 1354.625 C 75.112 1351.470, 113.306 1338.882, 134.500 1329.459 C 183.168 1307.823, 221.770 1285.436, 260.997 1256.099 C 280.057 1241.844, 298.425 1225.449, 328.826 1195.554 C 362.127 1162.808, 385.286 1133.566, 407.670 1096 C 427.019 1063.527, 430.431 1056.966, 447.458 1019.500 C 460.942 989.828, 464.472 978.257, 483.609 901 C 498.035 842.766, 549.729 636.436, 554.012 620 C 572.473 549.145, 592.445 478.080, 606.847 432 C 622.391 382.262, 630.945 362.446, 654.762 321 C 689.890 259.869, 708.840 234.684, 755.500 187.112 C 804.088 137.573, 860.800 92.593, 909.500 64.967 C 927.984 54.482, 991.312 21.173, 1017.500 8.161 L 1023.500 5.180 1024.001 680.340 L 1024.502 1355.500 1024.751 678 L 1025 0.500 512.500 0.752 L 0 1.004 0 678.441 M 0.497 678.500 C 0.497 1051.400, 0.611 1204.100, 0.750 1017.832 C 0.889 831.565, 0.889 526.465, 0.750 339.832 C 0.611 153.200, 0.497 305.600, 0.497 678.500" fill="#f2f2f3"></path>
        </svg>
    ), []);

    return (
        <div className="shadow-50 rounded-2xl w-full">
            <div className="rounded-t-2xl bg-white pb-2 px-[22px] overflow-hidden">
                <div className="flex h-11 w-full">
                    {BANNER_DATA.map((tab, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={tab.id}
                                onClick={() => handleTabClick(index)}
                                className={`flex-1 flex h-full items-center justify-center cursor-pointer text-center relative transition-all duration-300 ${isActive
                                        ? "bg-neutral-100 text-neutral-800 font-bold z-10"
                                        : "bg-white text-neutral-500 hover:bg-neutral-50"
                                    }`}
                            >
                                {/* Nội dung chữ */}
                                <div className="text-[11px] xl:text-xs leading-tight px-1 select-none">
                                    <b className={isActive ? "text-primary-500" : ""}>{tab.title}</b>
                                    <br />
                                    <span className="text-[10px] xl:text-[12px] font-normal opacity-80">{tab.subtitle}</span>
                                </div>

                                {/* 
                                  SVG Tai Mèo (Trái và Phải): Luôn hiện diện cố định trong DOM,
                                  sử dụng hiệu ứng ẩn/hiện mượt mà bằng CSS opacity để không bị mount/unmount liên tục.
                                */}
                                <div className={`absolute top-0 -left-[22.5px] h-11 w-9 pointer-events-none -scale-x-100 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
                                    {leftEarSvg}
                                </div>

                                <div className={`absolute top-0 -right-[22.5px] h-11 w-9 pointer-events-none transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
                                    {rightEarSvg}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* ================= PHẦN BANNER DƯỚI (SỬ DỤNG SWIPER SLIDE) ================= */}
            <div className="relative rounded-b-xl overflow-hidden group bg-white class-sliding-banner-home">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: ".custom-swiper-button-prev",
                        nextEl: ".custom-swiper-button-next",
                    }}
                    className="w-full"
                >
                    {BANNER_DATA.map((slide) => (
                        <SwiperSlide key={slide.id} className="w-full aspect-[23/10]">
                            <a href={slide.link} className="block w-full h-full">
                                <span className="cps-image-cdn relative inline-block aspect-[23/10] w-full border border-neutral-100 object-cover">
                                    <img
                                        alt={`${slide.title} ${slide.subtitle}`}
                                        loading="lazy"
                                        src={slide.imageUrl}
                                        className="object-cover w-full h-full transition-opacity duration-500 opacity-100"
                                    />
                                </span>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Nút Prev Arrow tự chế */}
                <button className="custom-swiper-button-prev absolute top-1/2 left-0 z-20 flex aspect-1/2 h-15 -translate-y-1/2 cursor-pointer items-center rounded-r-full bg-black/30 text-white shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-black/70">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="ml-0.5 size-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M328 112 184 256l144 144"></path>
                    </svg>
                </button>

                {/* Nút Next Arrow tự chế */}
                <button className="custom-swiper-button-next absolute top-1/2 right-0 z-20 flex aspect-1/2 h-15 -translate-y-1/2 cursor-pointer items-center rounded-l-full bg-black/30 text-white shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-black/70">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="ml-1.5 size-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="m184 112 144 144-144 144"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SliddingBanner;
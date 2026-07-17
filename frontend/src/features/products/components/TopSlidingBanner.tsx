import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { ArrowLeftSlide, ArrowRightSlide } from "../../../shared/components/Icons";
const BANNER_DATA = [
    {
        id: 0,
        link: "https://cellphones.com.vn/dien-thoai-samsung-galaxy-gap-moi.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/Cate-z8.png",
        alt: "Samsung Galaxy Gập Mới",
        width: 595,
        height: 100
    },
    {
        id: 1,
        link: "https://cellphones.com.vn/iphone-17-pro-max.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/595x100_iPhone17ProMax_07_2026.png",
        alt: "iPhone 17 Pro Max 256GB | Chính hãng",
        width: 595,
        height: 100
    },
    {
        id: 2,
        link: "https://cellphones.com.vn/dien-thoai-samsung-galaxy-s26-ultra.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/Cates26ggg.png",
        alt: "Samsung Galaxy S26",
        width: 595,
        height: 100
    },
    {
        id: 3,
        link: "https://cellphones.com.vn/mobile/samsung.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/Cate_dt_samsung.png",
        alt: "Điện thoại Samsung Galaxy",
        width: 595,
        height: 100
    },
    {
        id: 4,
        link: "https://cellphones.com.vn/dien-thoai-oppo-reno16-f.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/OppoReno16F_cate_open.png",
        alt: "OPPO Reno16 F",
        width: 595,
        height: 100
    },
    {
        id: 5,
        link: "https://cellphones.com.vn/mobile/xiaomi.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/Cate-dt-xiaomi.png",
        alt: "Điện thoại Xiaomi",
        width: 595,
        height: 100
    },
    {
        id: 6,
        link: "https://cellphones.com.vn/dien-thoai-xiaomi-17t.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/xiaomi-17t-cate-0726.png",
        alt: "Xiaomi 17T 5G",
        width: 595,
        height: 100
    },
    {
        id: 7,
        link: "https://cellphones.com.vn/dien-thoai-xiaomi-redmi-a7.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/cate_RedmiA7.jpg",
        alt: "Xiaomi Redmi A7 3GB 64GB",
        width: 595,
        height: 100
    },
    {
        id: 8,
        link: "https://cellphones.com.vn/dien-thoai-honor-600.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/cate_Honor600_opensale.jpg",
        alt: "HONOR 600 5G 8GB 256GB",
        width: 595,
        height: 100
    },
    {
        id: 9,
        link: "https://cellphones.com.vn/dien-thoai-nubia-neo-5-5g.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/cate_nubianeo5series.jpg",
        alt: "Điện thoại Nubia Neo 5 5G", // Được dọn dẹp lại từ link gốc trong thuộc tính alt
        width: 595,
        height: 100
    },
    {
        id: 10,
        link: "https://cellphones.com.vn/iphone-17-256gb.html",
        imgSrc: "https://cdn2.cellphones.com.vn/insecure/rs:fill:595:100/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/595x100_iPhone 17_07_2026.png",
        alt: "iPhone 17 256GB",
        width: 595,
        height: 100
    }
];
const TopSlidingBanner = () => {
    return (
        <div className="md:grid md:grid-cols-2 gap-2">
            <div className="group relative">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={10}
                    loop
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: ".button__view-banner-left-prev",
                        nextEl: ".button__view-banner-left-next",
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    className="rounded-xl"
                >
                    {BANNER_DATA.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <Link
                                to={slide.link}
                                className="block"
                            >
                                <img
                                    src={slide.imgSrc}
                                    alt={slide.alt}
                                    loading="lazy"
                                    className="block w-full rounded-xl object-cover"
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className="button__view-banner-left-prev shadow-50 absolute top-1/2 left-0 z-20 group-hover:opacity-100 opacity-0 transition-all duration-200 flex aspect-1/2 h-15 -translate-y-1/2 items-center justify-center rounded-r-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 w-7 h-7">
                    <ArrowLeftSlide className="size-5"/>
                </button>
                <button className="button__view-banner-left-next shadow-50 absolute top-1/2 right-0 z-20 group-hover:opacity-100 opacity-0 transition-all duration-200 flex aspect-1/2 h-15 -translate-y-1/2 items-center justify-center rounded-l-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 w-7 h-7">
                    <ArrowRightSlide className="size-5"/>
                </button>
            </div>
            <div className="group relative transition-all duration-200 md:block hidden">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={10}
                    loop
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        prevEl: ".button__view-banner-right-prev",
                        nextEl: ".button__view-banner-right-next",
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    className="rounded-xl"
                >
                    {BANNER_DATA.reverse().map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <Link
                                to={slide.link}
                                className="block"
                            >
                                <img
                                    src={slide.imgSrc}
                                    alt={slide.alt}
                                    loading="lazy"
                                    className="block w-full rounded-xl object-cover"
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className="button__view-banner-right-prev shadow-50 absolute top-1/2 left-0 z-20 group-hover:opacity-100 opacity-0 transition-all duration-200 flex aspect-1/2 h-15 -translate-y-1/2 items-center justify-center rounded-r-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 w-7 h-7">
                    <ArrowLeftSlide className="size-5"/>
                </button>
                <button className="button__view-banner-right-next shadow-50 absolute top-1/2 right-0 z-20 group-hover:opacity-100 opacity-0 transition-all duration-200 flex aspect-1/2 h-15 -translate-y-1/2 items-center justify-center rounded-l-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 w-7 h-7">
                    <ArrowRightSlide className="size-5"/>
                </button>
            </div>
        </div>
    )
}
export default TopSlidingBanner;
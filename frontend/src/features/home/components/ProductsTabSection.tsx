import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ProductItem } from "../../products/components/ProductItem";
import { useProducts } from "../../products/hooks/useProducts";
import "swiper/css";
import "swiper/css/navigation";
import type { ProductListClient } from "../../products/types/products.type";
import { ArrowLeftSlide, ArrowRightSlide } from "../../../shared/components/Icons";

type Tab = {
    key: string;
    label: string;
    imgUrl: string;
    query: object;
};
const tabs: Tab[] = [
    {
        key: "discount",
        label: "DEAL SỐC MỖI NGÀY",
        imgUrl: "https://cdn2.cellphones.com.vn/x/media/wysiwyg/Web/landing-page/hang-moi-ve/hotDueHome03.png",
        query: { discount: "10" }
    },
    {
        key: "features",
        label: "SẢN PHẨM HOT TREND",
        imgUrl: "https://cdn2.cellphones.com.vn/x/media/wysiwyg/Web/landing-page/hang-moi-ve/hotTrendHome02.png",
        query: { featured: "true" }
    },
    {
        key: "newest",
        label: "HÀNG MỚI VỀ",
        imgUrl: "https://cdn2.cellphones.com.vn/x/media/wysiwyg/Web/landing-page/hang-moi-ve/newArrivalHome.png",
        query: { sort: "newest" }
    }
];

const ProductTabSection = () => {
    const [tabActive, setTabActive] = useState<Tab>(tabs[0]);
    const { products, loading } = useProducts(tabActive.query);

    return (
        <section className="rounded-2xl" >
            <div className="grid grid-cols-3">
                {tabs.map((item) => {
                    const isActive = tabActive.key === item.key;
                    return (
                        <div
                            key={item.key}
                            onClick={() => setTabActive(item)}
                            className={`relative flex cursor-pointer items-center justify-center py-3 rounded-t-2xl overflow-hidden
                                ${isActive ? "border border-3 border-[#609AFA] font-extrabold border-b-0" : "shadow-[inset_-1px_0_10px_rgba(0,0,0,0.05),0_2px_8px_rgba(0,0,0,0.03)] border border-3 border-b-[#609AFA] border-t-0 border-l-0 border-r-0"
                                }`}
                            style={{ background: isActive ? "linear-gradient(188.66deg, #EFF5FF 28.75%, rgba(244, 251, 255, 0.4) 87.64%)" : "#F7F7F8" }}
                        >
                            <span className={`text-xs sm:text-md md:text-lg lg:text-2xl font-extrabold text-[#1E97EE]  transition-all duration-200
                                ${isActive ? "scale-95 opacity-0 absolute" : "scale-100 opacity-100"}`}
                            >
                                {item.label}
                            </span>
                            <span className={`flex items-center justify-center max-h-9 md:max-h-12 transition-all duration-200
                                ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-0 absolute"}`}
                            >
                                <img
                                    alt={item.label.replace(/\n/g, "")}
                                    className="object-contain h-8 md:h-11 w-auto"
                                    src={item.imgUrl}
                                />
                            </span>
                        </div>
                    );
                })}
            </div>

            <div
                className="rounded-b-2xl border-3 border-[#609AFA] border-t-0 p-3 md:p-5"
                style={{ background: "linear-gradient(188.66deg, #EFF5FF 28.75%, rgba(244, 251, 255, 0.4) 87.64%)" }}
            >
                <div className="relative">
                    {loading ? (
                        <div className="text-center py-20 text-neutral-500 font-medium">Đang tải sản phẩm...</div>
                    ) : (
                        <div className="w-full overflow-hidden">
                            <Swiper
                                key={tabActive.key}
                                modules={[Navigation]}
                                slidesPerView={2}
                                spaceBetween={5}
                                navigation={{
                                    prevEl: ".swiper-trend-prev",
                                    nextEl: ".swiper-trend-next",
                                }}
                                breakpoints={{
                                    640: { slidesPerView: 3 },
                                    768: { slidesPerView: 4 },
                                    1024: { slidesPerView: 5 },
                                }}
                                className="w-full !flex"
                            >
                                {products?.map((prod: ProductListClient) => (
                                    <SwiperSlide key={prod._id || prod.slug} className="!h-auto flex">
                                        <ProductItem product={prod} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    <button className="swiper-trend-prev shadow-50 absolute top-1/2 left-0 z-20 flex aspect-1/2 h-15 -translate-y-1/2 items-center justify-center rounded-r-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 md:w-9 md:h-18 w-6 h-10">
                        <ArrowLeftSlide className="size-7.5"/>
                    </button>
                    <button className="swiper-trend-next shadow-50 absolute top-1/2 right-0 z-20 flex aspect-1/2 h-15 -translate-y-1/2 items-center justify-center rounded-l-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 md:w-9 md:h-18 w-6 h-10">
                        <ArrowRightSlide className="size-7.5"/>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductTabSection;
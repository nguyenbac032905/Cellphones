import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeftSlide, ArrowRightSlide } from "../../../shared/components/Icons";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import type { ProductDetailClient } from "../types/products.type";
const ProductImagesSliding = ({ product }: { product: ProductDetailClient }) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const handleChangeIndex = (index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(index);
        }
    }
    return (
        <div className="flex flex-col gap-4 items-center p-2">
            <div className="rounded-2xl border border-neutral-200 w-full relative group overflow-hidden">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: ".detail-main-button-prev",
                        nextEl: ".detail-main-button-next",
                    }}
                    onSwiper={(swiper) => swiperRef.current = swiper}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    spaceBetween={10}
                    slidesPerView={1}
                >
                    {product?.images.map(image => (
                        <SwiperSlide>
                            <div className="flex h-[300px] items-center justify-center">
                                <img
                                    src={image.url}
                                    className="h-full object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="detail-main-button-prev absolute top-1/2 left-0 z-20 flex aspect-1/2 h-15 -translate-y-1/2 cursor-pointer items-center rounded-r-full bg-black/30 text-white shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-black/70">
                    <ArrowLeftSlide className="ml-1.5 size-6" />
                </button>
                <button className="detail-main-button-next absolute top-1/2 right-0 z-20 flex aspect-1/2 h-15 -translate-y-1/2 cursor-pointer items-center rounded-l-full bg-black/30 text-white shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-black/70">
                    <ArrowRightSlide className="ml-1.5 size-6" />
                </button>
            </div>
            <div className="relative w-full">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: ".detail-button-prev",
                        nextEl: ".detail-button-next",
                    }}
                    spaceBetween={5}
                    breakpoints={{
                        0: { slidesPerView: 4 },
                        400: { slidesPerView: 5 },
                        640: { slidesPerView: 8 },
                        768: { slidesPerView: 5 },
                        1024: { slidesPerView: 7 },
                        1280: { slidesPerView: 8 }
                    }}
                >
                    {product?.images.map((image, index) => {
                        const isActive = activeIndex === index;
                        return <SwiperSlide onClick={() => handleChangeIndex(index)}>
                            <div className={`border border-neutral-200 w-[64px] h-[64px] rounded-xl overflow-hidden inline-block object-cover cursor-pointer ${isActive ? "border-primary-500" : ""}`}>
                                <img className="aspect-square w-full object-cover" width={58} height={58} src={image.url} />
                            </div>
                        </SwiperSlide>
                    })}
                </Swiper>
                <button className={`detail-button-prev shadow-50 absolute top-1/2 left-0 z-20 flex aspect-1/2 -translate-y-1/2 items-center justify-center rounded-r-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 w-5 h-10`}>
                    <ArrowLeftSlide className="size-4" />
                </button>
                <button className={`detail-button-next shadow-50 absolute top-1/2 right-0 z-20 flex aspect-1/2 -translate-y-1/2 items-center justify-center rounded-l-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 w-5 h-10`}>
                    <ArrowRightSlide className="size-4" />
                </button>
            </div>
        </div>
    )
}
export default ProductImagesSliding;
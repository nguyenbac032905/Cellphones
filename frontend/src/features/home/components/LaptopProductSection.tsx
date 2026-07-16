import { Link } from "react-router-dom";
import { useProductsByCategory } from "../../products/hooks/useProductsByCategory";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ProductItem } from "../../products/components/ProductItem";
import "swiper/css";
import "swiper/css/navigation";

import type { ProductListClient } from "../../products/types/products.type";
import { ArrowLeftSlide, ArrowRightSlide } from "../../../shared/components/Icons";
import { useCategoriesTree } from "../../productCategories/hooks/useCategoriesTree";
import type { CategoryTree } from "../../productCategories/types/categories.type";
const tabs = [
    {
        key: "laptop",
        label: "Laptop",
        slug: "laptop"
    },
    {
        key: "may-tinh",
        label: "Máy tính",
        slug: "may-tinh"
    }
]
const LaptopProductSection = () => {
    const [tabActive, setTabActive] = useState(tabs[0]);
    const {products, loading} = useProductsByCategory(tabActive.slug);
    const {categoriesTree, loading: loadingTree} = useCategoriesTree();
    const categories = categoriesTree.find((item: CategoryTree) => item.slug === tabActive.slug)?.children;

    const groupedProducts = [];
    for (let i = 0; i < products.length; i += 2) {
        groupedProducts.push(products.slice(i, i + 2));
    }
    
    return (
        <div className="md:flex gap-4">
            <div className="hidden flex-1 md:flex flex-col justify-between gap-3">
                <Link to={"/"} className="rounded-2xl overflow-hidden">
                    <img width={321} height={795} src="https://cdn2.cellphones.com.vn/insecure/rs:fill:321:795/q:100/plain/https://media-asset.cellphones.com.vn/page_configs/01KVFPDXRAJ749QHYHQKZFR23W.png" />
                </Link>
                <Link to={"/"} className="rounded-2xl overflow-hidden">
                    <img width={321} height={795} src="https://cdn2.cellphones.com.vn/insecure/rs:fill:321:795/q:100/plain/https://media-asset.cellphones.com.vn/page_configs/01KX2BAAM9HGASWV93XBJQKZQD.png" />
                </Link>
            </div>
            <div className="w-full md:w-4/5 flex flex-col mt-2">
                <div className="w-full grid grid-cols-2">
                    {tabs.map(item => {
                        const isActive = item.key === tabActive.key;
                        return (
                            <div 
                                key={item.key}
                                onClick={() => setTabActive(item)}
                                className={`md:text-md text-base font-semibold flex items-center justify-center md:min-h-15 min-h-12 cursor-pointer transition-all duration-200 ease-in-out
                                    ${isActive ? "bg-gradient-to-t from-primary-500/11 to-white/5 border-b border-primary-500 text-primary-500"
                                    : "hover:bg-gradient-to-t from-neutral-500/11 to-white/5 hover:border-neutral-300 border-b border-neutral-100 text-neutral-800"}`}
                            >
                                {item.label}
                            </div>
                        )
                    })}
                </div>
                <div className="w-full my-3 flex gap-4 items-center">
                    {loadingTree ? (
                        <div className="text-center py-10 text-neutral-500 font-medium text-sm">
                            Đang tải danh mục...
                        </div>
                    ) : (
                        <div className="w-full flex-1 max-w-[calc(100%-132px)]">
                            {/* Swiper Container */}
                            <div className="flex-1 overflow-hidden relative">
                                <Swiper
                                    key={tabActive.key}
                                    modules={[Navigation]}
                                    slidesPerView="auto"
                                    spaceBetween={10}
                                    watchOverflow
                                    resistanceRatio={0}
                                    navigation={{
                                        prevEl: `.swiper-category-${tabActive.key}-prev`,
                                        nextEl: `.swiper-category-${tabActive.key}-next`,
                                    }}
                                    className="py-1"
                                >
                                    {categories?.map(item => (
                                        <SwiperSlide key={item._id || item.slug} className="!w-fit !flex-shrink-0" >
                                            <Link 
                                                to={`/${item.slug}`} 
                                                className="flex items-center justify-center whitespace-nowrap px-3 py-1.5 rounded-2xl border border-neutral-300 text-sm hover:bg-neutral-50 transition-all duration-200"
                                            >
                                                {item.title}
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <button className={`swiper-category-${tabActive.key}-prev shadow-50 absolute top-1/2 left-0 z-20 flex aspect-1/2 h-15 -translate-y-1/2 items-center justify-center rounded-r-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 md:w-6 md:h-14 w-5 h-8`}>
                                    <ArrowLeftSlide className="size-4"/>
                                </button>
                                <button className={`swiper-category-${tabActive.key}-next shadow-50 absolute top-1/2 right-0 z-20 flex aspect-1/2 h-15 -translate-y-1/2 items-center justify-center rounded-l-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 md:w-6 md:h-14 w-5 h-8`}>
                                    <ArrowRightSlide className="size-4"/>
                                </button>
                            </div>
                        </div>
                    )}
                    <Link to={`/${tabActive.slug}`} className="text-xs lock whitespace-nowrap flex items-center justify-center gap-2.5 !text-blue-500 rounded-2xl px-3 py-2 hover:bg-neutral-50">
                        Xem tất cả
                        <ArrowRightSlide className="size-4" />
                    </Link>
                </div>
                <div className="w-full flex-1 relative">
                    {loading ? (
                        <div className="text-center py-20 text-neutral-500 font-medium">Đang tải sản phẩm...</div>
                    ) : (
                        <div className="w-full h-full overflow-hidden">
                            <Swiper 
                                key={tabActive.key}
                                modules={[Navigation]}
                                slidesPerView={2}
                                spaceBetween={5}
                                navigation={{
                                    prevEl: `.swiper-${tabActive.key}-prev`,
                                    nextEl: `.swiper-${tabActive.key}-next`
                                }}
                                breakpoints={{
                                    640: {slidesPerView: 3},
                                    1024: {slidesPerView: 4}
                                }}
                                className="h-full"
                            >
                                {groupedProducts?.map((group, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="h-full flex flex-col justify-between gap-2">
                                            {group.map((product: ProductListClient, index) => (
                                                <ProductItem key={index} product={product} />
                                            ))}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </div>
                    )}
                    <button className={`swiper-${tabActive.key}-prev shadow-50 absolute top-1/2 left-0 z-20 flex aspect-1/2 h-15 -translate-y-1/2 items-center justify-center rounded-r-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 md:w-9 md:h-18 w-6 h-10`}>
                        <ArrowLeftSlide className="size-7.5"/>
                    </button>
                    <button className={`swiper-${tabActive.key}-next shadow-50 absolute top-1/2 right-0 z-20 flex aspect-1/2 h-15 -translate-y-1/2 items-center justify-center rounded-l-full bg-white/80 border border-neutral-100 transition-all duration-150 hover:bg-white/100 md:w-9 md:h-18 w-6 h-10`}>
                        <ArrowRightSlide className="size-7.5"/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default LaptopProductSection;
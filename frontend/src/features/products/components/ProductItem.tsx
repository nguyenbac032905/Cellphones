import { Link } from "react-router-dom";
import type { ProductListClient } from "../types/products.type";
import { FireBlueIcon, HeartIcon, StarIcon, TruckIcon } from "../../../shared/components/Icons";

export const ProductItem = ({ product }: { product: ProductListClient }) => {
    const formatPrice = (num: number) => num.toLocaleString("vi-VN") + "đ";

    // Tính toán giá mới
    const newPrice = product.discountPercentage > 0
        ? Math.round(product.price * (1 - product.discountPercentage / 100))
        : product.price;

    // Giả lập mức giảm Smember & Student theo form CellphoneS
    const smemberDiscount = Math.min(Math.round(product.price * 0.03), 200000);
    const sstudentDiscount = Math.min(Math.round(product.price * 0.05), 100000);
    const productLink = `/detail/${product.slug}`;

    return (
        <div className="h-full px-1 pt-1.5 pb-0.5">
            <div className="shadow-[0_2px_10px_rgba(0,0,0,0.05)] relative flex flex-col rounded-2xl bg-white h-full min-h-[290px] md:min-h-[370px] border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <Link to={productLink} className="group flex-1 p-2.5 pb-0">
                    <span className="relative inline-block aspect-square h-auto w-full scale-90 object-contain transition-transform duration-300 group-hover:scale-95 overflow-hidden">
                        <img
                            alt={product.title}
                            loading="lazy"
                            width="300"
                            height="300"
                            className="transition-opacity duration-500 opacity-100 object-contain aspect-square h-auto w-full mx-auto"
                            src={product.mainImage}
                        />
                    </span>
                    <p title={product.title} className="mb-1 line-clamp-2 h-9 text-xs leading-normal font-bold text-neutral-900 sm:h-10.5 sm:text-sm">
                        {product.title}
                    </p>
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                        <p className="text-xs font-semibold text-primary-600 sm:text-base">
                            {formatPrice(newPrice)}
                        </p>
                        {product.discountPercentage > 0 && (
                            <p className="text-xs text-gray-300 line-through sm:text-xs">
                                {formatPrice(product.price)}
                            </p>
                        )}
                    </div>
                    <div className="mb-1 rounded-sm bg-blue-100 px-1 py-0.5 text-[8px] font-medium text-blue-900 sm:text-[10px]">
                        Smember giảm đến <span className="font-bold text-blue-700">{formatPrice(smemberDiscount)}</span>
                    </div>
                    <div className="mb-1 rounded-sm bg-violet-100 px-1 py-0.5 text-[8px] font-medium text-violet-900 sm:text-[10px]">
                        S-Student giảm thêm <span className="font-bold text-violet-700">{formatPrice(sstudentDiscount)}</span>
                    </div>
                    {product.discountPercentage > 0 && (
                        <div
                            className="absolute -top-1.5 left-2.5 flex h-5.5 w-19.5 items-center justify-center text-[10px] font-bold text-white bg-cover bg-no-repeat bg-center"
                            style={{ backgroundImage: `url('https://cdn2.cellphones.com.vn/x/media/wysiwyg/discount-badge-ui-2025.png')` }}
                        >
                            Giảm {product.discountPercentage}%
                        </div>
                    )}
                    <div
                        className="absolute top-0 -right-1.25 flex h-7.25 w-18.75 items-center justify-center overflow-hidden text-[10px] font-medium text-blue-500"
                        style={{ backgroundImage: 'url("https://cdn2.cellphones.com.vn/x/media/wysiwyg/zero-ins-badge-ui-2025.png")', }}
                        >
                        <span className="mb-2 line-clamp-1 text-[10px] font-normal md:mb-1.5">
                            Trả góp <span className="text-xs font-medium">0%</span>
                        </span>
                    </div>
                </Link>

                <div className="mt-auto flex items-center justify-between px-2.5 pt-1.5 pb-2.5 empty:hidden">
                    <div className="my-1 mr-1.5 flex items-center justify-start gap-1 md:gap-1.5">
                        <div className="flex h-fit items-center gap-0">
                            <FireBlueIcon className="h-4 shrink-0 min-[375px]:h-5 md:h-6"/>
                            <div className="flex items-center gap-0.5 rounded-r-sm bg-blue-500 py-0.5 pr-1 -ml-0.5 md:gap-1 md:py-0.75 min-[375px]:-ml-px">
                                <TruckIcon />
                                <div className="whitespace-nowrap text-[8px] font-medium text-white min-[375px]:text-[10px] md:text-xs"> 2 Giờ </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-xs font-semibold">
                        <StarIcon className="size-4 fill-yellow-400"/>
                        <span>5</span>
                    </div>

                    <button
                        type="button"
                        className="group ml-auto flex h-8 items-center gap-1 rounded-full border border-white bg-white p-1 text-blue-500 hover:bg-gray-50"
                    >
                        <HeartIcon className="size-5.5 group-hover:animate-heartbeat"/>
                    </button>
                    </div>
            </div>
        </div>
    );
};
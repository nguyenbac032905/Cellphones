import { useState } from "react";
import { ClockIcon, FillStar } from "../../../shared/components/Icons";
import type { ProductDetailClient } from "../types/products.type";

const filtersRate = [
    {
        key: "all",
        label: "Tất cả"
    },
    {
        key: "image",
        label: "Có hình ảnh"
    },
    {
        key: "5star",
        label: "5 sao"
    },
    {
        key: "4star",
        label: "4 sao"
    },
    {
        key: "3star",
        label: "3 sao"
    },
    {
        key: "2star",
        label: "2 sao"
    },
    {
        key: "1star",
        label: "1 sao"
    }
];

const ProductRating = ({ product }: { product: ProductDetailClient }) => {
    const [filterRate, setFilterRate] = useState<string>(filtersRate[0].key);
    return (
        <div className="rounded-xl bg-[#f7f7f8] p-4 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Đánh giá {product?.title}</h2>
            <div className="bg-white rounded-xl py-6 px-8 flex flex-col md:flex-row gap-8 items-stretch justify-between">
                <div className="flex-[2] flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex flex-col items-center min-w-[140px] shrink-0">
                        <div className="text-[#a1a1aa] text-[24px] leading-[36px]">
                            <span className="text-[#18181b] text-[40px] font-bold">4.7</span>/5
                        </div>
                        <div className="flex gap-0.5 my-1">
                            {[...Array(5)].map((_, i) => (
                                <FillStar key={i} className="size-4" />
                            ))}
                        </div>
                        <p className="text-sm text-[#4a4a4a] mb-2">45 lượt đánh giá</p>
                        <button className="bg-primary-500 rounded-lg text-sm font-semibold text-white py-2 px-5 whitespace-nowrap">Viết đánh giá</button>
                    </div>
                    <div className="w-full sm:flex-1 flex flex-col gap-1.5 px-2 md:pr-8">
                        {[
                            { star: 5, count: 33, width: "73%" },
                            { star: 4, count: 12, width: "27%" },
                            { star: 3, count: 0, width: "0%" },
                            { star: 2, count: 0, width: "0%" },
                            { star: 1, count: 0, width: "0%" },
                        ].map((item) => (
                            <div key={item.star} className="flex items-center gap-2 text-xs text-neutral-600">
                                <div className="flex items-center gap-0.5 w-6 justify-end shrink-0">
                                    {item.star} <FillStar className="size-3 text-orange-400" />
                                </div>
                                <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-500" style={{ width: item.width }}></div>
                                </div>
                                <span className="w-20 text-neutral-400 shrink-0 text-right">{item.count} đánh giá</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-auto md:flex-initial border-t md:border-t-0 md:border-l border-neutral-200 pt-6 md:pt-0 md:pl-8 flex flex-col gap-2">
                    <div className="font-semibold text-sm text-neutral-800 mb-1 whitespace-nowrap">Đánh giá theo trải nghiệm</div>
                    {["Hiệu năng", "Thời lượng pin", "Chất lượng camera"].map((label) => (
                        <div key={label} className="flex items-center justify-between text-xs w-full gap-4">
                            <div className="text-neutral-700 min-w-[100px] shrink-0">{label}</div>
                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => <FillStar key={i} className="size-3.5" />)}
                                </div>
                                <div className="text-neutral-500"><strong className="text-neutral-800 font-semibold">4.9/5</strong> (28)</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-xl py-6 px-5">
                <div className="flex gap-5 items-center flex-wrap">
                    <div className="text-sm font-semibold text-neutral-800">Lọc đánh giá theo:</div>
                    <div className="flex gap-2 flex-wrap">
                        {filtersRate.map(item => {
                            const isActive = item.key === filterRate;
                            return <span key={item.key} onClick={() => setFilterRate(item.key)}
                                className={`py-1 px-3 text-xs rounded-2xl border cursor-pointer whitespace-nowrap
                                            ${isActive ? "border-[#3b82f6] text-[#2570eb] bg-[#eff5ff]" : "bg-[#f7f7f8] border-[#e4e4e7]"}`}
                            >
                                {item.label}
                            </span>
                        })}
                    </div>
                </div>
                <div className="flex flex-col mt-5 divide-y divide-neutral-100">
                    {/* Comment 1 */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-4 items-start">
                        <div className="flex gap-2 items-center w-full sm:w-[180px] shrink-0">
                            <span className="flex items-center justify-center w-7 h-7 text-xs font-bold rounded-full bg-[#26157d] text-white shrink-0"> T </span>
                            <span className="text-sm font-semibold text-neutral-800"> Trần Đức Tâm </span>
                        </div>
                        <div className="flex flex-col gap-2 flex-1 w-full">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <FillStar key={i} className="size-4" />
                                    ))}
                                </div>
                                <span className="text-xs font-medium text-neutral-600"> Tốt </span>
                            </div>
                            <div className="flex gap-2 text-[11px] flex-wrap">
                                <span className="bg-neutral-100 rounded-md text-neutral-700 py-1 px-2.5"> Hiệu năng Siêu mạnh mẽ </span>
                                <span className="bg-neutral-100 rounded-md text-neutral-700 py-1 px-2.5"> Thời lượng pin Cực khủng </span>
                                <span className="bg-neutral-100 rounded-md text-neutral-700 py-1 px-2.5"> Chất lượng camera Chụp đẹp, chuyên nghiệp </span>
                            </div>
                            <p className="text-xs text-neutral-800 leading-relaxed break-words"> Hôm nọ thấy giá 24990 mà chưa đủ tiền. Hôm nay gom đủ tiền lại lên thành hơn 27 là sao ta </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#a1a1aa] flex-wrap">
                                <ClockIcon className="size-3.5 shrink-0" />
                                <span>Đánh giá đã đăng vào 1 tuần trước</span>
                            </div>
                        </div>
                    </div>

                    {/* Comment 2 */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-4 items-start">
                        <div className="flex gap-2 items-center w-full sm:w-[180px] shrink-0">
                            <span className="flex items-center justify-center w-7 h-7 text-xs font-bold rounded-full bg-[#26157d] text-white shrink-0"> T </span>
                            <span className="text-sm font-semibold text-neutral-800"> Trần Đức Tâm </span>
                        </div>
                        <div className="flex flex-col gap-2 flex-1 w-full">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <FillStar key={i} className="size-4" />
                                    ))}
                                </div>
                                <span className="text-xs font-medium text-neutral-600"> Tốt </span>
                            </div>
                            <div className="flex gap-2 text-[11px] flex-wrap">
                                <span className="bg-neutral-100 rounded-md text-neutral-700 py-1 px-2.5"> Hiệu năng Siêu mạnh mẽ </span>
                                <span className="bg-neutral-100 rounded-md text-neutral-700 py-1 px-2.5"> Thời lượng pin Cực khủng </span>
                                <span className="bg-neutral-100 rounded-md text-neutral-700 py-1 px-2.5"> Chất lượng camera Chụp đẹp, chuyên nghiệp </span>
                            </div>
                            <p className="text-xs text-neutral-800 leading-relaxed break-words"> Hôm nọ thấy giá 24990 mà chưa đủ tiền. Hôm nay gom đủ tiền lại lên thành hơn 27 là sao ta </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#a1a1aa] flex-wrap">
                                <ClockIcon className="size-3.5 shrink-0" />
                                <span>Đánh giá đã đăng vào 1 tuần trước</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductRating;
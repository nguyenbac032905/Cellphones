import { useState } from "react"
import { ArrowLeftSlide, ArrowRightSlide, DecreaseIcon, HollowStar, IncreaseIcon, SaleIcon } from "../../../shared/components/Icons"
import { useProductsByCategory } from "../hooks/useProductsByCategory";
import { useProductQuery } from "../hooks/useProductQuery";
import { ProductItem } from "./ProductItem";
import type { ProductClientQuery } from "../types/products.type";

type Filter = {
    key: string;
    icon: React.ReactNode;
    label: string;
    event: Partial<ProductClientQuery>;
};
const filters: Filter[] = [
    {
        key: "featured",
        icon: <HollowStar />,
        label: "Nổi bật",
        event: {featured: "true"}
    },
    {
        key: "sale",
        icon: <SaleIcon />,
        label: "Khuyến mãi HOT",
        event: {discount: "20"}
    }
];
const sorts: Filter[] = [
    {
        key: "increase",
        icon: <IncreaseIcon />,
        label: "Giá Thấp - Cao",
        event: {sort: "price-asc"}
    },
    {
        key: "decrease",
        icon: <DecreaseIcon />,
        label: "Giá Cao - Thấp",
        event: {sort: "price-desc"}
    }
]
const ProductList = ({ categorySlug }: { categorySlug: string }) => {
    const [filterActive, setFilterActive] = useState<any>([]);
    const [sortActive, setSortActive] = useState<string>();
    const { query, updateQuery } = useProductQuery();
    const { products, meta, loading, error } = useProductsByCategory(categorySlug,query,"10");
    
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">
                    Chọn theo tiêu chí
                </h2>
                <div className="flex gap-3 flex-wrap max-md:pt-1">
                    {filters.map((item) => (
                        <span
                            key={item.key}
                            onClick={() => {
                                const isActive = filterActive.includes(item.key);
                                const nextFilters = isActive ? filterActive.filter((key: string) => key !== item.key) : [...filterActive, item.key];
                                setFilterActive(nextFilters);
                                updateQuery({
                                    [Object.keys(item.event)[0]]: isActive ? undefined : Object.values(item.event)[0],
                                    page: "1",
                                });
                            }}
                            className={`
                                shrink-0
                                whitespace-nowrap
                                flex items-center gap-2
                                rounded-3xl border
                                px-4 py-2
                                text-sm font-medium
                                transition-all duration-200
                                active:scale-95
                                cursor-pointer
                                ${filterActive.includes(item.key)
                                    ? "border-blue-500 bg-[#eff5ff] text-blue-600 shadow-[0_0_0_1px_#3b82f6]"
                                    : "border-neutral-200 bg-[#f7f7f8] text-neutral-800 hover:bg-[#e9e9ec] hover:border-neutral-300"
                                }
                            `}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">
                    Sắp xếp theo
                </h2>
                <div className="flex gap-3 flex-wrap max-md:pt-1">
                    {sorts.map((item) => (
                        <span
                            key={item.key}
                            onClick={() => {
                                setSortActive(item.key);
                                updateQuery(item.event);
                            }}
                            className={`
                                shrink-0
                                whitespace-nowrap
                                flex items-center gap-2
                                rounded-3xl border
                                px-4 py-2
                                text-sm font-medium
                                transition-all duration-200
                                active:scale-95
                                cursor-pointer
                                ${sortActive === item.key
                                    ? "border-blue-500 bg-[#eff5ff] text-blue-600 shadow-[0_0_0_1px_#3b82f6]"
                                    : "border-neutral-200 bg-[#f7f7f8] text-neutral-800 hover:bg-[#e9e9ec] hover:border-neutral-300"
                                }
                            `}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
                    {products.map(item => (
                        <ProductItem key={item._id} product={item} />
                    ))}
                </div>

                <div className="mt-4 flex justify-center">
                    {meta.totalPages > 0 && (
                        <div className="flex items-center gap-2 rounded-full">
                            <button
                                disabled={meta.page === 1}
                                onClick={() => updateQuery({ page: String(meta.page - 1) })}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white hover:text-primary-500 disabled:pointer-events-none disabled:opacity-40"
                            >
                                <ArrowLeftSlide className="size-6" />
                            </button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: meta.totalPages }).map((_, index) => {
                                    const page = index + 1;
                                    const active = page === meta.page;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => updateQuery({ page: String(page) })}
                                            className={`flex h-8 w-8 items-center justify-center rounded-full text-base font-medium transition-all duration-200 ${active
                                                    ? "bg-primary-500 text-white shadow-md"
                                                    : "text-neutral-600 hover:text-primary-500 hover:bg-white"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                disabled={meta.page === meta.totalPages}
                                onClick={() => updateQuery({ page: String(meta.page + 1) })}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white hover:text-primary-500 disabled:pointer-events-none disabled:opacity-40"
                            >
                                <ArrowRightSlide className="size-6" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ProductList
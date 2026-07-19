import type { ProductDetailClient } from "../types/products.type";
import { ArrowDownIcon } from "../../../shared/components/Icons";
import { useState } from "react";

const ProductContent = ({ product }: { product: ProductDetailClient }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="rounded-xl bg-[#f7f7f8] p-4 flex flex-col gap-2 relative min-h-[300px]">
            <h2 className="text-xl font-semibold">Đặc điểm nổi bật của {product.title}</h2>
            <div className={`relative`}>
                <div className="bg-white rounded-xl p-3" dangerouslySetInnerHTML={{
                    __html: product.description
                }} />
                {expanded && (
                    <div className="bg-white rounded-xl p-3 mt-2" dangerouslySetInnerHTML={{
                        __html: product.content
                    }} />
                )}
                {!expanded && (
                    <div className="absolute -bottom-[40px] left-0 right-0 h-24 pt-8 flex justify-center items-end bg-gradient-to-t from-white via-white/90 to-transparent pb-2 rounded-xl">
                        <button onClick={() => setExpanded(true)} className="text-[#3b82f6] hover:text-[#2563eb] font-medium flex gap-2 items-center z-10">
                            Xem thêm
                            <ArrowDownIcon />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default ProductContent;
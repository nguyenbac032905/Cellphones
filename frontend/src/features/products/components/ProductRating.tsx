import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FillStar } from "../../../shared/components/Icons";
import { useAppSelector } from "../../../app/hooks";
import type { ProductDetailClient } from "../types/products.type";
import type { StarFilter } from "../../reviews/types/review.type";
import { useReviewSummary } from "../../reviews/hooks/useReviewSummary";
import { useMyReview } from "../../reviews/hooks/useMyReview";
import { RatingStars } from "../../reviews/components/RatingStars";
import ReviewList from "../../reviews/components/ReviewList";
import ReviewFormModal from "../../reviews/components/ReviewFormModal";
import { formatRating } from "../../reviews/utils/reviewText";

const filtersRate: { key: string; label: string; star?: StarFilter }[] = [
    { key: "all", label: "Tất cả" },
    { key: "5star", label: "5 sao", star: "5" },
    { key: "4star", label: "4 sao", star: "4" },
    { key: "3star", label: "3 sao", star: "3" },
    { key: "2star", label: "2 sao", star: "2" },
    { key: "1star", label: "1 sao", star: "1" }
];

const ProductRating = ({ product }: { product: ProductDetailClient }) => {
    const [filterRate, setFilterRate] = useState<string>(filtersRate[0].key);
    const [openForm, setOpenForm] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const accessToken = useAppSelector(state => state.auth.accessToken);
    const isLoggedIn = !!accessToken;

    const { summary } = useReviewSummary(product._id);
    const { review: myReview } = useMyReview(product._id, isLoggedIn);

    const activeStar = filtersRate.find(item => item.key === filterRate)?.star;

    const handleWriteReview = () => {
        if (!isLoggedIn) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }
        setOpenForm(true);
    };

    return (
        <div id="product-reviews" className="rounded-xl bg-[#f7f7f8] p-4 flex flex-col gap-4 scroll-mt-24">
            <h2 className="text-xl font-semibold">Đánh giá {product?.title}</h2>
            <div className="bg-white rounded-xl py-6 px-8 flex flex-col md:flex-row gap-8 items-stretch justify-between">
                <div className="flex-[2] flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex flex-col items-center min-w-[140px] shrink-0">
                        <div className="text-[#a1a1aa] text-[24px] leading-[36px]">
                            <span className="text-[#18181b] text-[40px] font-bold">{formatRating(summary.average)}</span>/5
                        </div>
                        <div className="my-1">
                            <RatingStars value={summary.average} />
                        </div>
                        <p className="text-sm text-[#4a4a4a] mb-2">{summary.total} lượt đánh giá</p>
                        <button
                            type="button"
                            onClick={handleWriteReview}
                            className="bg-primary-500 rounded-lg text-sm font-semibold text-white py-2 px-5 whitespace-nowrap"
                        >
                            {myReview ? "Sửa đánh giá" : "Viết đánh giá"}
                        </button>
                    </div>
                    <div className="w-full sm:flex-1 flex flex-col gap-1.5 px-2 md:pr-8">
                        {([5, 4, 3, 2, 1] as const).map(star => {
                            const count = summary.distribution[star];
                            const width = summary.total > 0 ? `${(count / summary.total) * 100}%` : "0%";
                            return (
                                <div key={star} className="flex items-center gap-2 text-xs text-neutral-600">
                                    <div className="flex items-center gap-0.5 w-6 justify-end shrink-0">
                                        {star} <FillStar className="size-3 text-orange-400" />
                                    </div>
                                    <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary-500" style={{ width }}></div>
                                    </div>
                                    <span className="w-20 text-neutral-400 shrink-0 text-right">{count} đánh giá</span>
                                </div>
                            );
                        })}
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
                <ReviewList key={`${product._id}-${activeStar ?? "all"}`} productID={product._id} star={activeStar} />
            </div>
            <ReviewFormModal
                open={openForm}
                onClose={() => setOpenForm(false)}
                productID={product._id}
                productTitle={product.title}
                existing={myReview}
            />
        </div>
    )
}
export default ProductRating;

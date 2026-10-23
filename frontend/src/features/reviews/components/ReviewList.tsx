import { ClockIcon } from "../../../shared/components/Icons";
import { useReviews } from "../hooks/useReviews";
import type { StarFilter } from "../types/review.type";
import { getRatingLabel, timeAgo } from "../utils/reviewText";
import { RatingStars } from "./RatingStars";

interface ReviewListProps {
    productID: string;
    star?: StarFilter;
}

// Render với key={`${productID}-${star}`} để reset danh sách khi đổi bộ lọc
const ReviewList = ({ productID, star }: ReviewListProps) => {
    const { reviews, loading, error, hasMore, loadMore } = useReviews(productID, star);

    if (!loading && !error && reviews.length === 0) {
        return <div className="py-10 text-center text-sm text-neutral-500">Chưa có đánh giá nào.</div>;
    }

    return (
        <div className="flex flex-col mt-5 divide-y divide-neutral-100">
            {reviews.map(review => (
                <div key={review._id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-4 items-start">
                    <div className="flex gap-2 items-center w-full sm:w-[180px] shrink-0">
                        {review.user.avatar ? (
                            <img src={review.user.avatar} alt={review.user.fullName} className="w-7 h-7 rounded-full object-cover shrink-0" />
                        ) : (
                            <span className="flex items-center justify-center w-7 h-7 text-xs font-bold rounded-full bg-[#26157d] text-white shrink-0">
                                {review.user.fullName.charAt(0).toUpperCase()}
                            </span>
                        )}
                        <span className="text-sm font-semibold text-neutral-800">{review.user.fullName}</span>
                    </div>
                    <div className="flex flex-col gap-2 flex-1 w-full">
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <RatingStars value={review.rating} />
                            <span className="text-xs font-medium text-neutral-600">{getRatingLabel(review.rating)}</span>
                        </div>
                        <p className="text-xs text-neutral-800 leading-relaxed break-words whitespace-pre-line">{review.content}</p>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#a1a1aa] flex-wrap">
                            <ClockIcon className="size-3.5 shrink-0" />
                            <span>Đánh giá đã đăng vào {timeAgo(review.createdAt)}</span>
                        </div>
                    </div>
                </div>
            ))}
            {loading && <div className="py-4 text-center text-sm text-neutral-500">Đang tải đánh giá...</div>}
            {error && <div className="py-4 text-center text-sm text-red-500">{error}</div>}
            {hasMore && !loading && (
                <div className="flex justify-center pt-4">
                    <button
                        type="button"
                        onClick={loadMore}
                        className="rounded-lg border border-neutral-200 px-5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                        Xem thêm đánh giá
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewList;

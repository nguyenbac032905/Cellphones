import { useState } from "react";
import { Modal } from "antd";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useCreateReview, useDeleteReview, useUpdateReview } from "../hooks/useReviewActions";
import type { MyReview } from "../types/review.type";
import { formatRating, getRatingLabel } from "../utils/reviewText";
import StarPicker from "./StarPicker";

const MAX_LENGTH = 1000;

interface ReviewFormProps {
    productID: string;
    existing: MyReview | null;
    onDone: () => void;
}

const ReviewForm = ({ productID, existing, onDone }: ReviewFormProps) => {
    const [rating, setRating] = useState(existing?.rating ?? 0);
    const [content, setContent] = useState(existing?.content ?? "");
    const [error, setError] = useState("");

    const { createReview, loading: creating } = useCreateReview();
    const { updateReview, loading: updating } = useUpdateReview();
    const { deleteReview, loading: deleting } = useDeleteReview();
    const busy = creating || updating || deleting;

    const handleSubmit = async () => {
        const text = content.trim();
        if (rating < 1) {
            setError("Vui lòng chọn số sao");
            return;
        }
        if (!text) {
            setError("Vui lòng nhập nội dung đánh giá");
            return;
        }

        try {
            setError("");
            if (existing) {
                await updateReview(existing._id, productID, { rating, content: text });
            } else {
                await createReview({ productID, rating, content: text });
            }
            onDone();
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    const handleDelete = async () => {
        if (!existing || !window.confirm("Bạn chắc chắn muốn xóa đánh giá này?")) return;
        try {
            setError("");
            await deleteReview(existing._id, productID);
            onDone();
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2">
                <StarPicker value={rating} onChange={setRating} />
                <span className="h-5 text-sm font-medium text-neutral-600">
                    {rating > 0 ? `${formatRating(rating)}/5 - ${getRatingLabel(rating)}` : "Chọn số sao của bạn"}
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <textarea
                    value={content}
                    maxLength={MAX_LENGTH}
                    rows={5}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    className="w-full resize-none rounded-lg border border-neutral-200 p-3 text-sm outline-none focus:border-blue-500"
                />
                <span className="text-right text-xs text-neutral-400">{content.length}/{MAX_LENGTH}</span>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex items-center justify-between gap-3">
                {existing ? (
                    <button
                        type="button"
                        disabled={busy}
                        onClick={handleDelete}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-50"
                    >
                        Xóa đánh giá
                    </button>
                ) : <span />}
                <button
                    type="button"
                    disabled={busy}
                    onClick={handleSubmit}
                    className="rounded-lg bg-primary-500 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                    {busy ? "Đang gửi..." : existing ? "Cập nhật đánh giá" : "Gửi đánh giá"}
                </button>
            </div>
        </div>
    );
};

interface ReviewFormModalProps {
    open: boolean;
    onClose: () => void;
    productID: string;
    productTitle: string;
    existing: MyReview | null;
}

const ReviewFormModal = ({ open, onClose, productID, productTitle, existing }: ReviewFormModalProps) => (
    <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        destroyOnHidden
        title={<span className="line-clamp-2 text-base">Đánh giá {productTitle}</span>}
    >
        <ReviewForm productID={productID} existing={existing} onDone={onClose} />
    </Modal>
);

export default ReviewFormModal;

import { useState } from "react";
import { PartialStar } from "./RatingStars";

interface StarPickerProps {
    value: number;
    onChange: (value: number) => void;
}

// Chọn sao từ 1 đến 5, bước 0.5 (nửa trái / nửa phải của mỗi ngôi sao). Tối thiểu là 1.
const StarPicker = ({ value, onChange }: StarPickerProps) => {
    const [hover, setHover] = useState<number | null>(null);
    const shown = hover ?? value;

    return (
        <div className="flex items-center gap-1" onMouseLeave={() => setHover(null)}>
            {[1, 2, 3, 4, 5].map(star => {
                const half = Math.max(1, star - 0.5);
                return (
                    <div key={star} className="relative size-9">
                        <PartialStar fill={shown - (star - 1)} className="size-9" />
                        <button
                            type="button"
                            aria-label={`${half} sao`}
                            className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
                            onMouseEnter={() => setHover(half)}
                            onClick={() => onChange(half)}
                        />
                        <button
                            type="button"
                            aria-label={`${star} sao`}
                            className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
                            onMouseEnter={() => setHover(star)}
                            onClick={() => onChange(star)}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default StarPicker;

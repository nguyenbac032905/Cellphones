const STAR_PATH =
    "M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z";

export const StarShape = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 576 512" fill="currentColor" aria-hidden="true">
        <path d={STAR_PATH} />
    </svg>
);

// Một ngôi sao được tô theo tỉ lệ fill (0 -> 1), dùng chung cho hiển thị và chọn sao
export const PartialStar = ({ fill, className = "size-4" }: { fill: number; className?: string }) => (
    <span className={`relative inline-block shrink-0 ${className}`}>
        <StarShape className={`absolute inset-0 text-neutral-200 ${className}`} />
        <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${Math.max(0, Math.min(1, fill)) * 100}%` }}>
            <StarShape className={`text-yellow-400 ${className}`} />
        </span>
    </span>
);

// Hiển thị điểm dạng 5 sao, hỗ trợ số lẻ (4.5, 4.7...)
export const RatingStars = ({ value, className = "size-4" }: { value: number; className?: string }) => (
    <div className="flex gap-0.5" role="img" aria-label={`${value} trên 5 sao`}>
        {[0, 1, 2, 3, 4].map(i => (
            <PartialStar key={i} fill={value - i} className={className} />
        ))}
    </div>
);

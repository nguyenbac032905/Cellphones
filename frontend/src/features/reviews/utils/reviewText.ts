export const getRatingLabel = (rating: number) => {
    if (rating >= 5) return "Tuyệt vời";
    if (rating >= 4) return "Tốt";
    if (rating >= 3) return "Bình thường";
    if (rating >= 2) return "Tệ";
    if (rating > 0) return "Rất tệ";
    return "";
};

export const formatRating = (value: number) =>
    Number.isInteger(value) ? String(value) : value.toFixed(1);

export const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) return "vừa xong";
    if (diff < hour) return `${Math.floor(diff / minute)} phút trước`;
    if (diff < day) return `${Math.floor(diff / hour)} giờ trước`;
    if (diff < 7 * day) return `${Math.floor(diff / day)} ngày trước`;
    if (diff < 30 * day) return `${Math.floor(diff / (7 * day))} tuần trước`;
    if (diff < 365 * day) return `${Math.floor(diff / (30 * day))} tháng trước`;
    return `${Math.floor(diff / (365 * day))} năm trước`;
};

import type { ProductVariantClient } from "../types/products.type";
import type { VariantOption } from "../hooks/useVariantSelection";

interface ProductVariantSelectorProps {
    attributeKeys: string[];
    options: Record<string, VariantOption[]>;
    selectedVariant?: ProductVariantClient;
    discountPercentage?: number;
    onSelect: (key: string, value: string) => void;
}

const ATTRIBUTE_LABELS: Record<string, string> = {
    color: "Màu sắc",
    storage: "Phiên bản",
    rom: "Phiên bản",
    ram: "RAM",
    size: "Kích thước"
};

const COLOR_KEYS = ["color", "colour", "mau", "mausac"];

const getLabel = (key: string) => ATTRIBUTE_LABELS[key.toLowerCase()] ?? key;
const isColorKey = (key: string) => COLOR_KEYS.includes(key.toLowerCase());

const formatPrice = (price: number) => `${price.toLocaleString("vi-VN")}đ`;

// badge dấu tích đỏ ở góc trên bên phải của ô đang chọn
const CheckBadge = () => (
    <span className="absolute right-0 top-0 flex h-[18px] w-[22px] items-center justify-center rounded-bl-lg rounded-tr-[10px] bg-primary-500">
        <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 6.5l2.5 2.5 4.5-5" />
        </svg>
    </span>
);

const ProductVariantSelector = ({ attributeKeys, options, selectedVariant, discountPercentage = 0, onSelect }: ProductVariantSelectorProps) => {
    if (attributeKeys.length === 0) return null;

    const getFinalPrice = (price?: number) =>
        price === undefined ? undefined : Math.round(price * (1 - discountPercentage / 100));

    return (
        <div className="flex flex-col gap-4">
            {attributeKeys.map((key) => {
                const colorMode = isColorKey(key);

                return (
                    <div key={key} className="flex flex-col gap-2">
                        <div className="text-base font-semibold text-neutral-900">{getLabel(key)}</div>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {options[key]?.map((option) => {
                                const isSelected = selectedVariant?.attributes[key] === option.value;
                                const finalPrice = getFinalPrice(option.price);

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => onSelect(key, option.value)}
                                        className={`relative flex cursor-pointer items-center rounded-xl !border bg-white text-sm text-neutral-900 transition-all duration-200 ${colorMode
                                            ? "min-h-[64px] gap-2 px-2 py-1.5 text-left"
                                            : "min-h-[62px] justify-center px-3 py-2 text-center"
                                            } ${isSelected
                                                ? "!border-primary-500 font-semibold"
                                                : "!border-neutral-200 hover:!border-primary-500"
                                            } ${option.outOfStock ? "opacity-50" : ""}`}
                                    >
                                        {colorMode && option.image && (
                                            <img
                                                src={option.image}
                                                alt={option.value}
                                                className="size-10 shrink-0 object-contain"
                                            />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className={colorMode ? "truncate font-semibold" : "font-medium"}>{option.value}</div>
                                            {colorMode && finalPrice !== undefined && (
                                                <div className="text-[13px] font-normal text-neutral-800">{formatPrice(finalPrice)}</div>
                                            )}
                                            {option.outOfStock && (
                                                <div className="text-[11px] font-normal text-gray-500">Hết hàng</div>
                                            )}
                                        </div>
                                        {isSelected && <CheckBadge />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductVariantSelector;

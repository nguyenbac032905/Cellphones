import { useMemo, useState } from "react";
import type { ProductVariantClient } from "../types/products.type";

export interface VariantOption {
    value: string;
    outOfStock: boolean;
    image?: string;
    price?: number;
}

const getVariantImage = (variant: ProductVariantClient) =>
    variant.images.find((img) => img.isMain)?.url ?? variant.images[0]?.url;
export const useVariantSelection = (variants: ProductVariantClient[]) => {
    const [selectedId, setSelectedId] = useState<string>();

    const selectedVariant = useMemo(
        () => variants.find((variant) => variant._id === selectedId) ?? variants.find((variant) => variant.stock > 0) ?? variants[0],
        [variants, selectedId]
    );

    const attributeKeys = useMemo(() => {
        const keys: string[] = [];
        variants.forEach((variant) => {
            Object.keys(variant.attributes).forEach((key) => {
                if (!keys.includes(key)) keys.push(key);
            });
        });
        return keys;
    }, [variants]);

    const options = useMemo(() => {
        const result: Record<string, VariantOption[]> = {};

        attributeKeys.forEach((key) => {
            const list: VariantOption[] = [];

            variants.forEach((variant) => {
                const value = variant.attributes[key];
                if (value === undefined) return;

                const existing = list.find((option) => option.value === value);
                if (existing) {
                    if (variant.stock > 0) existing.outOfStock = false;
                    if (!existing.image) existing.image = getVariantImage(variant);
                    if (existing.price === undefined || variant.price < existing.price) existing.price = variant.price;
                } else {
                    list.push({
                        value,
                        outOfStock: variant.stock <= 0,
                        image: getVariantImage(variant),
                        price: variant.price
                    });
                }
            });

            result[key] = list;
        });

        return result;
    }, [variants, attributeKeys]);

    const selectOption = (key: string, value: string) => {
        const candidates = variants.filter((variant) => variant.attributes[key] === value);
        if (candidates.length === 0) return;

        const current = selectedVariant?.attributes ?? {};
        const score = (variant: ProductVariantClient) =>
            attributeKeys.filter((k) => k !== key && variant.attributes[k] === current[k]).length;

        const best = [...candidates].sort(
            (a, b) => score(b) - score(a) || Number(b.stock > 0) - Number(a.stock > 0)
        )[0];

        setSelectedId(best._id);
    };

    return { selectedVariant, attributeKeys, options, selectOption };
};

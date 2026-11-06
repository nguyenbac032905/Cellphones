import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useProductVariants } from "../hooks/useProductVariants";
import { useVariantSelection } from "../hooks/useVariantSelection";
import ProductImagesSliding from "../components/ProductImagesSliding";
import ProductInfo from "../components/ProductInfo";
import ProductVariantSelector from "../components/ProductVariantSelector";
import ProductContent from "../components/ProductContent";
import ProductRating from "../components/ProductRating";
import CommitProduct from "../components/CommitProduct";
const ProductDetailPage = () => {
    const { productSlug = "" } = useParams();
    const { product } = useProduct(productSlug);
    const { variants } = useProductVariants(productSlug);
    const { selectedVariant, attributeKeys, options, selectOption } = useVariantSelection(variants);

    if (!product) {
        return <div>Loading Product</div>
    }

    // Gallery dùng chung của sản phẩm; ảnh của variant đang chọn được đưa lên đầu (khử trùng theo url)
    const images = (() => {
        const variantImages = selectedVariant?.images ?? [];
        const seen = new Set<string>();
        return [...variantImages, ...product.images].filter((img) => {
            if (seen.has(img.url)) return false;
            seen.add(img.url);
            return true;
        });
    })();

    return (
        <div className="mt-10 mb-10 flex flex-col gap-10 px-2 xl:px-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                    <ProductImagesSliding key={selectedVariant?._id ?? "default"} images={images} />
                    <CommitProduct />
                </div>
                <ProductInfo
                    product={product}
                    selectedVariant={selectedVariant}
                    variantSelector={
                        <ProductVariantSelector
                            attributeKeys={attributeKeys}
                            options={options}
                            selectedVariant={selectedVariant}
                            discountPercentage={product.discountPercentage}
                            onSelect={selectOption}
                        />
                    }
                />
            </div>
            <ProductContent product={product} />
            <ProductRating product={product} />
        </div>
    );
};

export default ProductDetailPage;

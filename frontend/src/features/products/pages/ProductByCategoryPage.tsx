import { useParams, useSearchParams } from "react-router-dom";
import TopSlidingBanner from "../components/TopSlidingBanner";
import ListCategory from "../../productCategories/components/ListCategory";
import ProductsList from "../components/ProductsList";
import { useProductsByCategory } from "../hooks/useProductsByCategory";
import { useEffect } from "react";
import { useProductQuery } from "../hooks/useProductQuery";

const ProductByCategoryPage = () => {
    const { categorySlug = "" } = useParams<{ categorySlug: string }>();
    const [searchParams] = useSearchParams();
    const { query, updateQuery } = useProductQuery();
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    useEffect(() => {
        updateQuery({
            minPrice: minPrice ?? undefined,
            maxPrice: maxPrice ?? undefined,
        });
    }, [minPrice, maxPrice]);
    const { products, meta} = useProductsByCategory(categorySlug,query,"10");
    return (
        <div className="mt-10 mb-10 flex flex-col gap-10 px-2 xl:px-1">
            <TopSlidingBanner />
            <ListCategory categorySlug={categorySlug}/>
            <ProductsList products={products} meta={meta} updateQuery={updateQuery}/>
        </div>
    );
};

export default ProductByCategoryPage;
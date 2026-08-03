import { useSearchParams } from "react-router-dom";
import TopSlidingBanner from "../components/TopSlidingBanner";
import { useProductQuery } from "../hooks/useProductQuery";
import { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductsList from "../components/ProductsList";

const ProductSearchPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const { query, updateQuery } = useProductQuery();
    useEffect(() => {
        updateQuery({ search: keyword ?? undefined });
    }, [keyword])
    const { products, meta } = useProducts(query, "10")

    return (
        <div className="mt-10 mb-10 flex flex-col gap-10 px-2 xl:px-1">
            <TopSlidingBanner />
            <ProductsList products={products} meta={meta} updateQuery={updateQuery}/>
        </div>
    );
};

export default ProductSearchPage;
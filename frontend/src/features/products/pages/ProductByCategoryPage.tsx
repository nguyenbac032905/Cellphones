import { useParams } from "react-router-dom";
import TopSlidingBanner from "../components/TopSlidingBanner";
import ListCategory from "../../productCategories/components/ListCategory";
import ProductList from "../components/ProductList";

const ProductByCategoryPage = () => {
    const { categorySlug = "" } = useParams<{ categorySlug: string }>();
    return (
        <div className="mt-10 mb-10 flex flex-col gap-10 px-2 xl:px-1">
            <TopSlidingBanner />
            <ListCategory categorySlug={categorySlug}/>
            <ProductList categorySlug={categorySlug}/>
        </div>
    );
};

export default ProductByCategoryPage;
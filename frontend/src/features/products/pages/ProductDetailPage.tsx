import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import ProductImagesSliding from "../components/ProductImagesSliding";
import ProductInfo from "../components/ProductInfo";
import ProductContent from "../components/ProductContent";
import ProductRating from "../components/ProductRating";
import CommitProduct from "../components/CommitProduct";
const ProductDetailPage = () => {
    const { productSlug = "" } = useParams();
    const { product, error, loading } = useProduct(productSlug);
    if(!product){
        return <div>Loading Product</div>
    }
    return (
        <div className="mt-10 mb-10 flex flex-col gap-10 px-2 xl:px-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                    <ProductImagesSliding product={product} />
                    <CommitProduct />
                </div>
                <ProductInfo product={product} />
            </div>
            <ProductContent product={product}/>
            <ProductRating product={product}/>
        </div>
    );
};

export default ProductDetailPage;
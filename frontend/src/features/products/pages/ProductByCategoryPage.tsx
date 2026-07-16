import { useParams } from "react-router-dom";

const ProductByCategoryPage = () => {
    const {categorySlug} = useParams();
    console.log(categorySlug);
    return (
        <div className="flex flex-col gap-10 mt-2 px-2 xl:px-1 mb-10">
            by category
        </div>
    )
}
export default ProductByCategoryPage;
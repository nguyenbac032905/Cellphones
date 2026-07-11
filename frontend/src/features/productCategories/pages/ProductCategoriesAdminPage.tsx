import AdminTitle from "../../../shared/components/AdminTitle";
import CustomAlert from "../../../shared/components/CustomAlert";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CategoryFilterAdmin from "../components/CategoryFilterAdmin";
import CategoryTableAdmin from "../components/CategoryTableAdmin";
import CategoryToolbarAdmin from "../components/CategoryToolbarAdmin";
import { useAdminCategories } from "../hooks/useAdminCategories";
import { useAdminCategoryQuery } from "../hooks/useAdminCategoryQuery";

const ProductCategoriesAdminPage = () => {
    const {query, updateQuery} = useAdminCategoryQuery();
    const {categories, loading, error, refetch, meta} = useAdminCategories(query);
    console.log(categories)
    if (loading) return <LoadingScreen />;
    if (error) return <CustomAlert error={error} />;

    return (
        <div className="flex flex-col gap-5">
            <AdminTitle
                title="Product Categories List"
                description="Manage all product categories in your store"
            />
            <CategoryFilterAdmin query={query} updateQuery={updateQuery} categories={categories}/>
            <CategoryToolbarAdmin query={query} updateQuery={updateQuery} />
            <CategoryTableAdmin updateQuery={updateQuery} categories={categories} meta={meta} refetch={refetch} />
        </div>
    );
};

export default ProductCategoriesAdminPage;
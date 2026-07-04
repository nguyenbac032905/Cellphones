import ProductTable from "../components/AdminProductTable";
import AdminProductFilter from "../components/AdminProductFilter";
import AdminProductToolbar from "../components/AdminProductToolbar";
import { useAdminProductQuery } from "../hooks/useAdminProductQuery";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { useState } from "react";
import type { Product } from "../types/products.type";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import AdminTitle from "../../../shared/components/AdminTitle";

const AdminProductsPage = () => {
    const {query, updateQuery} = useAdminProductQuery();
    const {products,meta, loading, error, refetch} = useAdminProducts(query);
    const [selectedRows, setSelectedRows] = useState<Product[]>([]);
    console.log(products)
    if (loading) {
        return <LoadingScreen/>
    }

    if(error){
        return <CustomAlert error={error}/>
    }
    return (
        <>
            <div className="flex flex-col gap-5">
                <AdminTitle title="Products List" description="Manage all products in your store" />
                <AdminProductFilter query={query} updateQuery={updateQuery}/>
                <AdminProductToolbar query={query} updateQuery={updateQuery} selectedRows={selectedRows} refetch={refetch}/>
                <ProductTable products={products} meta={meta} updateQuery={updateQuery} refetch={refetch} setSelectedRows={setSelectedRows}/>
            </div>
        </>
    )
}
export default AdminProductsPage;
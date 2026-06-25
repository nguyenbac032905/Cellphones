import ProductTable from "../components/AdminProductTable";
import AdminProductFilter from "../components/AdminProductFilter";
import AdminProductToolbar from "../components/AdminProductToolbar";
import { Spin } from "antd";
import { useAdminProductQuery } from "../hooks/useAdminProductQuery";
import { useAdminProducts } from "../hooks/useAdminProducts";

const AdminProductsPage = () => {
    const {query, updateQuery} = useAdminProductQuery();
    const {data, loading, error} = useAdminProducts(query);
    console.log(query)
    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-5">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Products
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage all products in your store
                </p>
            </div>
            <AdminProductFilter query={query} updateQuery={updateQuery}/>
            <AdminProductToolbar query={query} updateQuery={updateQuery}/>
            <ProductTable data={data} query={query} updateQuery={updateQuery}/>
        </div>
    )
}
export default AdminProductsPage;
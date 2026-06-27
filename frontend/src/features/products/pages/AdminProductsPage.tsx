import ProductTable from "../components/AdminProductTable";
import AdminProductFilter from "../components/AdminProductFilter";
import AdminProductToolbar from "../components/AdminProductToolbar";
import { message, Spin } from "antd";
import { useAdminProductQuery } from "../hooks/useAdminProductQuery";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { useEffect, useState } from "react";
import type { Product } from "../types/products.type";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";

const AdminProductsPage = () => {
    const {query, updateQuery} = useAdminProductQuery();
    const {data, loading, error, refetch} = useAdminProducts(query);
    const [selectedRows, setSelectedRows] = useState<Product[]>([]);

    if (loading) {
        return <LoadingScreen/>
    }

    if(error){
        return <CustomAlert error={error}/>
    }
    return (
        <>
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
                <AdminProductToolbar query={query} updateQuery={updateQuery} selectedRows={selectedRows} refetch={refetch}/>
                <ProductTable data={data} updateQuery={updateQuery} refetch={refetch} setSelectedRows={setSelectedRows}/>
            </div>
        </>
    )
}
export default AdminProductsPage;
import { useEffect, useState } from "react";
import type { Product } from "../types/products.type";
import { productAdminService } from "../services/productAdmin.service";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import ProductTable from "../components/AdminProductTable";
import AdminProductFilter from "../components/AdminProductFilter";
import AdminProductToolbar from "../components/AdminProductToolbar";
import { Spin } from "antd";

const AdminProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productAdminService.getAll();
                setProducts(data);
            } catch (error: any) {
                const message = getErrorMessage(error);
                console.error(message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    },[])

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
            <AdminProductFilter />
            <AdminProductToolbar />
            <ProductTable products={products} />
        </div>
    )
}
export default AdminProductsPage;
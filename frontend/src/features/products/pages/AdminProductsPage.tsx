import { useEffect, useState } from "react";
import type { Product } from "../types/products.type";
import { productAdminService } from "../services/productAdmin.service";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

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
    if(loading){
        return <div>Loading...</div>
    }
    console.log(products)
    return (
        <div>products Page</div>
    )
}
export default AdminProductsPage;
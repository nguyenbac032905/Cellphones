import AdminTitle from "../../../shared/components/AdminTitle";
import CustomAlert from "../../../shared/components/CustomAlert";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import OrderFilterAdmin from "../components/OrderFilterAdmin";
import OrdersTable from "../components/OrdersTable";
import { useOrderQueryAdmin } from "../hooks/useOrderQueryAdmin";
import { useOrdersAdmin } from "../hooks/useOrdersAdmin";

const ListOrderAdminPage = () => {
    const {query, updateQuery} = useOrderQueryAdmin();
    const {orders, meta, loading, error, refetch} = useOrdersAdmin(query);
    if (loading) {
        return <LoadingScreen/>
    }
    if(error){
        return <CustomAlert error={error}/>
    }
    return (
        <div className="flex flex-col gap-5">
            <AdminTitle title="Orders List" description="Manage all orders in your store" />
            <OrderFilterAdmin query={query} updateQuery={updateQuery}/>
            <OrdersTable orders={orders} meta={meta} updateQuery={updateQuery} refetch={refetch}/>
        </div>
    )
}
export default ListOrderAdminPage;
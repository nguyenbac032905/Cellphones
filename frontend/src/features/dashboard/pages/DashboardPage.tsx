import AdminTitle from "../../../shared/components/AdminTitle";
import DashboardStats from "../components/DashboardStats";
import NewProductsThisWeek from "../components/NewProductsThisWeek";
import OrderPipeline from "../components/OrderPipeline";
import SaleThisWeek from "../components/SaleThisWeek";
import UserSignupsThisWeek from "../components/UserSignupsThisWeek";
import VisitorsThisWeek from "../components/VisitorsThisWeek";

const DashboardPage = () => {
    return(
        <div className="flex flex-col gap-5">
            <AdminTitle title="Dashboard" description="Overview of your store's performance" />
            <DashboardStats />
            <div className="flex flex-col gap-2">
                <div>Order Pipeline</div>
                <OrderPipeline />
            </div>
            <SaleThisWeek />
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full mt-4">
                <NewProductsThisWeek />
                <VisitorsThisWeek />
                <UserSignupsThisWeek />
            </div>
        </div>
)
}
export default DashboardPage;
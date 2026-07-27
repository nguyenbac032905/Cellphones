import AdminTitle from "../../../shared/components/AdminTitle";
import DashboardStats from "../components/DashboardStats";
import NewProductsThisWeek from "../components/NewProductsThisWeek";
import OrderPipeline from "../components/OrderPipeline";
import SaleThisWeek from "../components/SaleThisWeek";
import UserSignupsThisWeek from "../components/UserSignupsThisWeek";
import VisitorsThisWeek from "../components/VisitorsThisWeek";

const DashboardPage = () => {
    return (
        <div className="flex flex-col gap-5">
            <AdminTitle title="Dashboard" description="Overview of your store's performance" />
            <DashboardStats />
            <SaleThisWeek />
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 w-full mt-2">
                <NewProductsThisWeek />
                <VisitorsThisWeek />
                <UserSignupsThisWeek />
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-neutral-800">Order Pipeline</h2>
                <OrderPipeline />
            </div>
        </div>
    );
};

export default DashboardPage;
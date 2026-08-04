import { Link } from "react-router-dom";
import AdminTitle from "../../../shared/components/AdminTitle";
import CustomAlert from "../../../shared/components/CustomAlert";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCouponsAdmin } from "../hooks/useCouponsAdmin";
import CouponsTable from "../components/CouponsTable";

const CouponsPageAdmin = () => {
    const {coupons, loading, error, refetch} = useCouponsAdmin();
    if(loading){
        return <LoadingScreen />
    }
    if(error){
        return <CustomAlert error={error} />
    }
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-end justify-between">
                <AdminTitle title="Coupon list" description="Manage all coupons" />
                <Link to="/admin/coupons/create" className="flex justify-end">
                    <Button
                        size="large"
                        icon={<PlusOutlined />}
                        className="
                            !border-green-500
                            !text-green-600
                            hover:!border-green-500
                            hover:!text-green-600
                            hover:!bg-green-50
                        "
                    >
                        New Coupon
                    </Button>
                </Link>
            </div>
            <CouponsTable coupons={coupons} refetch={refetch}/>
        </div>
    )
}
export default CouponsPageAdmin;
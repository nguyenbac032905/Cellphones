
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../../app/store";

const AdminPrivateRoute = () => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    if(!accessToken){
        <Navigate to={"/admin/login"} replace/>
    }
    return <Outlet />
}
export default AdminPrivateRoute
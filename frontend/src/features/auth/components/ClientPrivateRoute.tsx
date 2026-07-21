import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../../app/store";

const ClientPrivateRoute = () => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    if(!accessToken){
        <Navigate to={"/login"} replace/>
    }
    return <Outlet />
}
export default ClientPrivateRoute
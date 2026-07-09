import { Navigate, Outlet } from "react-router-dom";
import { usePermission } from "../hooks/usePermission";
interface Props {
    permission: string
}
const PermissionRoute = ({permission}: Props) =>{
    const can = usePermission()
    if(!can(permission)){
        return <Navigate to="/403" replace />;
    }
    return <Outlet />
}

export default PermissionRoute;
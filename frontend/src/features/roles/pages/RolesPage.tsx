import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import AdminTitle from "../../../shared/components/AdminTitle";
import { useAdminRoles } from "../hooks/useAdminRoles";
import RoleTable from "../components/RolesTable";
import { PlusOutlined } from "@ant-design/icons";
import { Button} from "antd";
import { Link } from "react-router-dom";

const RolesPage = () => {
    const { roles, loading, error, refetch} = useAdminRoles();
    if (loading) {
        return <LoadingScreen />
    }

    if (error) {
        return <CustomAlert error={error} />
    }
    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-end">
                    <AdminTitle title="Roles List" description="Create, edit, and manage user roles and access permissions." />
                    <Link to="/admin/roles/create" className="flex justify-end">
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
                            New Role
                        </Button>
                    </Link>
                </div>
                <RoleTable roles={roles} refetch={refetch}/>
            </div>
        </>
    )
}
export default RolesPage;
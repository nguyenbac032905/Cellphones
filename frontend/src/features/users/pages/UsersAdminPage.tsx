import { Link } from "react-router-dom";
import AdminTitle from "../../../shared/components/AdminTitle";
import CustomAlert from "../../../shared/components/CustomAlert";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import { useAdminUserQuery } from "../hooks/useAdminUserQuery";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserFilterAdmin from "../components/UserFilterAdmin";
import UsersTableAdmin from "../components/UserTableAdmin";

const UserAdminPage = () => {
    const {query, updateQuery} = useAdminUserQuery();
    const {users, meta, loading, error, refetch} = useAdminUsers(query);
    if(loading){
        return <LoadingScreen />
    }
    if(error){
        return <CustomAlert error={error} />
    }
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-end justify-between">
                <AdminTitle title="Users list" description="Manage all user" />
                <Link to="/admin/users/create" className="flex justify-end">
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
                        New Admin
                    </Button>
                </Link>
            </div>
            <UserFilterAdmin query={query} updateQuery={updateQuery}/>
            <UsersTableAdmin updateQuery={updateQuery} meta={meta} users={users} refetch={refetch}/>
        </div>
    )
}
export default UserAdminPage;
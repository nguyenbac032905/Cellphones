import {
    Card,
    Descriptions,
    Tag,
    Space,
    Button,
    Empty,
    Divider,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useAdminRole } from "../hooks/useAdminRole";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import AdminTitle from "../../../shared/components/AdminTitle";

const RoleDetailPage = () => {
    const { roleID } = useParams();
    const { role, loading, error } = useAdminRole(roleID);

    if (loading) return <LoadingScreen />;
    if (error) return <CustomAlert error={error} />;
    if (!role) return <CustomAlert error="Role not found" />;

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-end justify-between">
                <AdminTitle
                    title="Role Detail"
                    description="View detailed information of a role"
                />

                <Link to={`/admin/roles/edit/${role._id}`}>
                    <Button
                        size="large"
                        type="primary"
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Button>
                </Link>
            </div>

            <Card>
                <Descriptions
                    title="Basic Information"
                    bordered
                    column={1}
                    size="middle"
                >
                    <Descriptions.Item label="Title">
                        {role.title}
                    </Descriptions.Item>

                    <Descriptions.Item label="Description">
                        {role.description || "-"}
                    </Descriptions.Item>
                </Descriptions>

                <Divider />

                <div className="flex flex-col gap-4">
                    <h3 className="m-0 text-base font-semibold">
                        Permissions ({role.permissions.length})
                    </h3>

                    {role.permissions.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No permissions"
                        />
                    ) : (
                        <Space wrap>
                            {role.permissions.map((permission) => (
                                <Tag
                                    key={permission}
                                    color="blue"
                                >
                                    {permission}
                                </Tag>
                            ))}
                        </Space>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default RoleDetailPage;
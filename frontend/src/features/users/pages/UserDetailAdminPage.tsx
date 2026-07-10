import { Link, useParams } from "react-router-dom";
import { Card, Typography, Tag, Descriptions, Divider, Image, Avatar, } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AdminTitle from "../../../shared/components/AdminTitle";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import { useUserAdmin } from "../hooks/useUserAdmin";

const { Title, Text } = Typography;

const UserDetailAdminPage = () => {
    const { userID } = useParams();
    const { user, loading, error } = useUserAdmin(userID);

    if (loading) {
        return <LoadingScreen />;
    }
    if (error) {
        return <CustomAlert error={error} />;
    }
    if (!user) {
        return <CustomAlert error="User not found" />;
    }

    return (
        <div className="flex flex-col gap-5">
            <AdminTitle
                title="User Detail"
                description="View detailed information of a user"
            />
            <Card className="rounded-2xl shadow-sm">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 md:flex-row md:items-start md:justify-between">
                            <div>
                                <Title level={2} className="!mb-1">
                                    {user.fullName}
                                </Title>

                                <Text type="secondary">
                                    {user.email}
                                </Text>
                            </div>
                            <div className="rounded-xl bg-gray-50 px-5 py-3">
                                <Link
                                    to={`/admin/users/edit/${userID}`}
                                    className="text-sm font-medium text-gray-700 hover:text-black"
                                >
                                    Edit User
                                </Link>
                            </div>
                        </div>
                        <Descriptions
                            bordered
                            column={1}
                            size="middle"
                        >
                            <Descriptions.Item label="Full Name">
                                {user.fullName}
                            </Descriptions.Item>

                            <Descriptions.Item label="Email">
                                {user.email}
                            </Descriptions.Item>

                            <Descriptions.Item label="Phone">
                                {user.phone || "-"}
                            </Descriptions.Item>

                            <Descriptions.Item label="Account Type">
                                <Tag color="purple" className="capitalize">
                                    {user.accountType}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label="Status">
                                <Tag
                                    color={
                                        user.status === "active"
                                            ? "success"
                                            : "error"
                                    }
                                    className="capitalize"
                                >
                                    {user.status}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label="Created At">
                                <Tag color="blue">
                                    {new Date(
                                        user.createdAt
                                    ).toLocaleString("vi-VN")}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label="Updated At">
                                <Tag color="cyan">
                                    {new Date(
                                        user.updatedAt
                                    ).toLocaleString("vi-VN")}
                                </Tag>
                            </Descriptions.Item>

                            {user.deletedAt && (
                                <Descriptions.Item label="Deleted At">
                                    <Tag color="red">
                                        {new Date(
                                            user.deletedAt
                                        ).toLocaleString("vi-VN")}
                                    </Tag>
                                </Descriptions.Item>
                            )}

                        </Descriptions>
                    </div>

                    <div>
                        <Card className="rounded-2xl">
                            <div className="flex flex-col items-center">
                                {user.avatar ? (
                                    <Image
                                        src={user.avatar}
                                        alt={user.fullName}
                                        width={280}
                                        className="rounded-xl object-cover"
                                    />
                                ) : (
                                    <Avatar
                                        size={220}
                                        icon={<UserOutlined />}
                                    />
                                )}

                                <Divider />

                                <div className="w-full space-y-4">
                                    <div className="flex justify-between">
                                        <Text strong>Account type:</Text>

                                        <Tag color="red">
                                            {user.accountType}
                                        </Tag>
                                    </div>
                                    <div className="flex justify-between">
                                        <Text strong>Role</Text>
                                        <Tag
                                            color="green"
                                        >
                                            <Link
                                                to={`/admin/roles/details/${user.roleID._id}`}
                                                className="underline"
                                            >
                                                {user.roleID.title}
                                            </Link>
                                        </Tag>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UserDetailAdminPage;
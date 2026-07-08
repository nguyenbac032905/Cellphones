import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import type { Role } from "../types/role.type";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useAdminDeleteRole } from "../hooks/useAdminDeleteRole";

type Props = {
    roles: Role[];
    refetch: () => Promise<void>
};

const RoleTable = ({ roles, refetch }: Props) => {
    const { deletingRoleID, deleteRole } = useAdminDeleteRole();
    const columns: ColumnsType<Role> = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value: string) =>
                new Date(value).toLocaleDateString("vi-VN"),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Link to={`/admin/roles/details/${record._id}`}>
                        <Button variant="outlined">
                            Detail
                        </Button>
                    </Link>

                    <Link to={`/admin/roles/edit/${record._id}`}>
                        <Button color="primary" variant="outlined">
                            Update
                        </Button>
                    </Link>

                    <Popconfirm
                        title="Delete Role"
                        description="Are you sure you want to delete this role?"
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true }}
                        onConfirm={async () => {
                            try {
                                const resDelete = await deleteRole(record._id);
                                if(resDelete.success){
                                    await refetch();
                                    message.success(resDelete.message);
                                }
                            } catch (error) {
                                message.error(getErrorMessage(error));
                            }
                        }}
                    >
                        <Button color="danger" variant="outlined" loading={deletingRoleID === record._id}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowKey="_id"
            scroll={{x: 1000}}
            dataSource={roles}
            columns={columns}
            className="overflow-hidden rounded-2xl border border-gray-200"
            pagination={false}
        />
    );
};

export default RoleTable;
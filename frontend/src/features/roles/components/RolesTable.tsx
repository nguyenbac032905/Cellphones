import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import type { Role } from "../types/role.type";

type Props = {
    roles: Role[];
};

const RoleTable = ({ roles }: Props) => {
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
                        onConfirm={() => {
                            // TODO: delete role
                        }}
                    >
                        <Button color="danger" variant="outlined">
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
import {
    Avatar,
    Button,
    Popconfirm,
    Space,
    Switch,
    Table,
    Tag,
} from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { PaginationMeta } from "../../../shared/types/common.type";
import type { UserListItem, UserQuery } from "../types/users.type";

type Props = {
    users: UserListItem[];
    meta: PaginationMeta;
    updateQuery: (values: Partial<UserQuery>) => void;
    refetch: () => Promise<void>;
};

const UsersTable = ({
    users,
    meta,
    updateQuery,
    refetch,
}: Props) => {
    const [updatingId, setUpdatingId] = useState("");

    const columns = [
        {
            title: "#",
            key: "index",
            width: 70,
            render: (_: any, __: UserListItem, index: number) =>
                (Number(meta.page) - 1) * Number(meta.limit) + index + 1,
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            width: 90,
            render: (avatar: string | null, record: UserListItem) => (
                <Avatar size={46} src={avatar || undefined}>
                    {record.fullName.charAt(0).toUpperCase()}
                </Avatar>
            ),
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Account Type",
            dataIndex: "accountType",
            render: (type: "admin" | "user") => (
                <Tag color={type === "admin" ? "red" : "green"}>
                    {type.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Role",
            render: (_: any, record: UserListItem) => record.roleID.title,
        },
        {
            title: "Status",
            render: (_: any, record: UserListItem) => (
                <Switch
                    checked={record.status === "active"}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                    loading={updatingId === record._id}
                    onChange={async (checked) => {
                        console.log(checked)
                    }}
                />
            ),
        },
        {
            title: "Actions",
            width: 240,
            render: (_: any, record: UserListItem) => (
                <Space>
                    <Link to={`/admin/users/details/${record._id}`}>
                        <Button
                            color="default"
                            variant="outlined"
                            style={{ width: 65 }}
                        >
                            Detail
                        </Button>
                    </Link>

                    <Link to={`/admin/users/edit/${record._id}`}>
                        <Button
                            color="primary"
                            variant="outlined"
                            style={{ width: 65 }}
                        >
                            Update
                        </Button>
                    </Link>

                    <Popconfirm
                        title="Delete User"
                        description="Are you sure you want to delete this user?"
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{
                            danger: true,
                            loading: updatingId === record._id,
                        }}
                        onConfirm={async () => {
                            try {
                                setUpdatingId(record._id);

                                // TODO:
                                // await deleteUser(record._id);
                                // await refetch();
                            } finally {
                                setUpdatingId("");
                            }
                        }}
                    >
                        <Button
                            color="danger"
                            variant="outlined"
                            style={{ width: 65 }}
                            loading={updatingId === record._id}
                        >
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
            dataSource={users}
            columns={columns}
            className="overflow-hidden rounded-2xl border border-gray-200"
            scroll={{ x: 1000 }}
            pagination={{
                placement: ["bottomCenter"],
                current: Number(meta.page || 1),
                pageSize: Number(meta.limit || 10),
                total: meta.total,
                onChange: (page) => {
                    updateQuery({ page });
                },
            }}
        />
    );
};

export default UsersTable;
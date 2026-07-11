import { Button, Image, Input, Popconfirm, Space, Switch, Table, } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { PaginationMeta } from "../../../shared/types/common.type";
import { usePermission } from "../../auth/hooks/usePermission";
import { PERMISSIONS } from "../../roles/constants/role.const";
import type { CategoryListItem, ProductCategoryQuery } from "../types/categories.type";

type Props = {
    categories: CategoryListItem[];
    meta: PaginationMeta;
    updateQuery: (values: Partial<ProductCategoryQuery>) => void;
    refetch: () => Promise<void>;
};

const CategoryTableAdmin = ({ categories, meta, updateQuery, }: Props) => {
    const [updatingId, setUpdatingId] = useState("");

    const can = usePermission();
    const canUpdate = can(PERMISSIONS.CATEGORIES.UPDATE);
    const canDelete = can(PERMISSIONS.CATEGORIES.DELETE);

    const columns = [
        {
            title: "Position",
            dataIndex: "position",
            key: "position",
            width: 100,
            render: (position: number, record: CategoryListItem) => (
                <Input
                    defaultValue={position}
                    disabled={!canUpdate || updatingId === record._id}
                    style={{
                        width: 60,
                        textAlign: "center",
                    }}
                    onBlur={(e) => {
                        const newPosition = Number(e.target.value);

                        if (newPosition === position) return;

                        console.log({
                            id: record._id,
                            title: record.title,
                            position: newPosition,
                        });
                    }}
                />
            ),
        },
        {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            key: "thumbnail",
            width: 120,
            render: (thumbnail: string) => (
                <Image
                    src={thumbnail}
                    width={80}
                    height={80}
                    style={{
                        objectFit: "contain",
                        borderRadius: 8,
                    }}
                />
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Parent",
            dataIndex: "parentTitle",
            key: "parentTitle",
            render: (parentTitle: string | null) =>
                parentTitle || "-",
        },
        {
            title: "Status",
            key: "status",
            width: 140,
            render: (_: any, record: CategoryListItem) => (
                <Switch
                    disabled={!canUpdate}
                    checked={record.status === "active"}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                    onChange={(checked) => {
                        console.log({
                            id: record._id,
                            title: record.title,
                            status: checked
                                ? "active"
                                : "inactive",
                        });
                    }}
                />
            ),
        },
        {
            title: "Actions",
            key: "actions",
            width: 240,
            render: (_: any, record: CategoryListItem) => (
                <Space>
                    <Link
                        to={`/admin/product-categories/details/${record._id}`}
                    >
                        <Button
                            color="default"
                            variant="outlined"
                            style={{ width: 65 }}
                        >
                            Detail
                        </Button>
                    </Link>

                    {canUpdate && (
                        <Link
                            to={`/admin/product-categories/edit/${record._id}`}
                        >
                            <Button
                                color="primary"
                                variant="outlined"
                                style={{ width: 65 }}
                            >
                                Update
                            </Button>
                        </Link>
                    )}

                    {canDelete && (
                        <Popconfirm
                            title="Delete Category"
                            description="Are you sure you want to delete this category?"
                            okText="Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true }}
                            onConfirm={() => {
                                console.log(
                                    "Delete",
                                    record._id
                                );
                            }}
                        >
                            <Button
                                color="danger"
                                variant="outlined"
                                style={{ width: 65 }}
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowKey="_id"
            dataSource={categories}
            columns={columns}
            className="overflow-hidden rounded-2xl border border-gray-200"
            scroll={{ x: 900 }}
            pagination={{
                placement: ["bottomCenter"],
                current: Number(meta.page || 1),
                pageSize: Number(meta.limit || 4),
                total: meta.total,
                onChange: (page) =>
                    updateQuery({
                        page: Number(page),
                    }),
            }}
        />
    );
};

export default CategoryTableAdmin;
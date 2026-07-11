import { Link, useParams } from "react-router-dom";
import { useCategoryAdmin } from "../hooks/useCategoryAdmin";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import { Card, Tabs, Tag, Typography, Image, Descriptions } from "antd";
import AdminTitle from "../../../shared/components/AdminTitle";
import { sanitizeHtml } from "../../../shared/utils/sanitizeHtml";
const { Title, Text } = Typography;

const CategoryDetailAdminPage = () => {
    const { categoryID } = useParams<{ categoryID: string }>();
    const { category, loading, error } = useCategoryAdmin(categoryID);

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <CustomAlert error={error} />;
    }

    if (!category) {
        return <CustomAlert error="Category not found" />;
    }

    return (
        <div className="flex flex-col gap-5">
            <AdminTitle
                title="Category Detail"
                description="View detailed information of a product category"
            />

            <Card className="rounded-2xl shadow-sm">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* LEFT COLUMN: INFO & DESCRIPTION */}
                    <div className="lg:col-span-2">

                        {/* HEADER */}
                        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 md:flex-row md:items-start md:justify-between">
                            <div>
                                <Title level={2} className="!mb-1">
                                    {category.title}
                                </Title>
                                <Text type="secondary">
                                    Parent Category:
                                    {category.parent_id ? (
                                        <Link
                                            to={`/admin/product-categories/details/${category.parent_id._id}`}
                                            className="ml-2 inline-flex items-center !underline rounded-md bg-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-300 hover:text-black"
                                        >
                                            {category.parent_id.title}
                                        </Link>
                                    ) : (
                                        <span className="ml-2 text-gray-400 italic">None (Root)</span>
                                    )}
                                </Text>
                            </div>
                            <div className="rounded-xl bg-gray-50 px-5 py-3 text-right flex items-center justify-center">
                                <Link
                                    to={`/admin/product-categories/edit/${categoryID}`}
                                    className="text-sm font-medium text-gray-700 hover:text-black underline"
                                >
                                    Edit Category
                                </Link>
                            </div>
                        </div>

                        {/* CATEGORY METADATA */}
                        <Descriptions
                            bordered
                            column={1}
                            size="middle"
                            className="mb-6"
                        >
                            <Descriptions.Item label="Description">
                                <Text>{category.description}</Text>
                            </Descriptions.Item>

                            <Descriptions.Item label="Status">
                                <Tag
                                    color={category.status === "active" ? "success" : "error"}
                                    className="px-3 py-1 text-sm font-medium capitalize"
                                >
                                    {category.status}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label="Position">
                                <Tag color="blue" className="px-3 py-1 text-sm font-medium">
                                    {category.position}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label="Slug">
                                <Text code>{category.slug}</Text>
                            </Descriptions.Item>

                            <Descriptions.Item label="Created At">
                                <Tag color="orange" className="px-3 py-1 text-sm">
                                    {new Date(category.createdAt).toLocaleString("vi-VN")}
                                </Tag>
                            </Descriptions.Item>

                            <Descriptions.Item label="Updated At">
                                <Tag color="cyan" className="px-3 py-1 text-sm">
                                    {new Date(category.updatedAt).toLocaleString("vi-VN")}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    {/* RIGHT COLUMN: THUMBNAIL */}
                    <div>
                        <Card className="rounded-2xl border border-gray-100 shadow-none bg-gray-50/50">
                            <div className="text-center mb-3">
                                <Text strong type="secondary">Category Thumbnail</Text>
                            </div>
                            <div className="flex justify-center">
                                {category.thumbnail ? (
                                    <Image
                                        src={category.thumbnail}
                                        alt={category.title}
                                        className="rounded-xl object-cover max-h-[300px] w-full"
                                        style={{ maxWidth: '100%' }}
                                    />
                                ) : (
                                    <div className="h-[200px] w-full rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 italic">
                                        No Image Available
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CategoryDetailAdminPage;
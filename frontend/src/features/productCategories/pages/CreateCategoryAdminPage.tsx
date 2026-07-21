import { useState } from "react";
import { Button, Card, Form, Image, Input, message, Radio, TreeSelect, Upload, } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AdminTitle from "../../../shared/components/AdminTitle";
import { privateAdmin } from "../../../shared/api/privateAdmin";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { useAdminCategoriesTree } from "../hooks/useAdminCategoriesTree";
import { useCreateCategoryAdmin } from "../hooks/useCreateCategoryAdmin";
import { createCategorySchema } from "../validations/category.validation";
const { TextArea } = Input;

const CreateCategoryAdminPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { categoriesTree } = useAdminCategoriesTree();
    const { loading, createCategory } = useCreateCategoryAdmin();

    const [thumbnail, setThumbnail] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [uploadLoading, setUploadLoading] = useState(false);

    const uploadButton = (
        <div className="flex flex-col items-center justify-center text-gray-500">
            <PlusOutlined />
            <span className="mt-2 text-xs">Upload</span>
        </div>
    );

    const onFinish = async (values: any) => {
        const payload = {
            ...values,
            parent_id: values.parent_id || null,
            thumbnail,
        };

        const parsed = createCategorySchema.safeParse(payload);

        if (!parsed.success) {
            const formErrors = zodToAntFormErrors(parsed.error);

            form.setFields(
                Object.keys(formErrors).map((key) => ({
                    name: key,
                    errors: formErrors[key],
                }))
            );

            return;
        }

        try {
            const result = await createCategory(parsed.data);

            message.success(result.message);

            form.resetFields();
            setThumbnail("");

            navigate("/admin/product-categories");
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <AdminTitle
                title="Add New Category"
                description="Create and manage product categories"
            />
            <Card className="rounded-2xl shadow-md">
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        status: "active",
                    }}
                    onFinish={onFinish}
                >
                    <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
                        <Card className="col-span-2 rounded-xl">
                            <h2 className="mb-5 text-xl font-semibold text-gray-900">
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                                <Form.Item
                                    label="Title"
                                    name="title"
                                >
                                    <Input placeholder="Category title" />
                                </Form.Item>
                                <Form.Item
                                    label="Parent Category"
                                    name="parent_id"
                                >
                                    <TreeSelect
                                        allowClear
                                        className="w-full !border !border-gray-300"
                                        placeholder="Select parent category"
                                        treeData={categoriesTree}
                                        fieldNames={{
                                            label: "title",
                                            value: "_id",
                                            children: "children",
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Position"
                                    name="position"
                                >
                                    <Input
                                        type="number"
                                        placeholder="Auto if empty"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Status"
                                    name="status"
                                >
                                    <Radio.Group
                                        options={[
                                            {
                                                value: "active",
                                                label: "Active",
                                            },
                                            {
                                                value: "inactive",
                                                label: "Inactive",
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                            <Form.Item
                                label="Description"
                                name="description"
                            >
                                <TextArea
                                    rows={8}
                                    placeholder="Category description..."
                                />
                            </Form.Item>
                        </Card>
                        <div className="space-y-5">
                            <Card className="rounded-xl">
                                <Form.Item label="Thumbnail">
                                    <Upload
                                        showUploadList={false}
                                        listType="picture-card"
                                        disabled={uploadLoading}
                                        customRequest={async ({ file, onSuccess, onError, }) => {
                                            try {
                                                setUploadLoading(true);

                                                const formData = new FormData();
                                                formData.append( "images", file as Blob );

                                                const res = await privateAdmin.post(
                                                    "/admin/api/uploads/images",
                                                    formData,
                                                    {
                                                        headers: {
                                                            "Content-Type": "multipart/form-data",
                                                        },
                                                    }
                                                );

                                                const url = res.data.data.urls[0];

                                                setThumbnail(url);
                                                form.setFieldValue("thumbnail", url);

                                                if (onSuccess) onSuccess(res.data.data);
                                            } catch (error) {
                                                if (onError) onError(error as Error);
                                            } finally {
                                                setUploadLoading(false);
                                            }
                                        }}
                                        onPreview={() => {
                                            setPreviewImage(thumbnail);
                                            setPreviewOpen(true);
                                        }}
                                    >
                                        {thumbnail ? (
                                            <Image
                                                src={thumbnail}
                                                preview={false}
                                                className="rounded-lg"
                                                style={{
                                                    width: "100%",
                                                    maxHeight: 250,
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>

                                    {previewImage && (
                                        <Image
                                            wrapperStyle={{
                                                display: "none",
                                            }}
                                            preview={{
                                                visible: previewOpen,
                                                onVisibleChange: setPreviewOpen,
                                                afterOpenChange: (visible) => {
                                                    if (!visible) {
                                                        setPreviewImage("");
                                                    }
                                                },
                                            }}
                                            src={previewImage}
                                        />
                                    )}
                                </Form.Item>
                            </Card>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="h-11 w-full"
                            >
                                Create Category
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default CreateCategoryAdminPage;
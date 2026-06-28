import { useState, useRef } from "react";
import {
    Card,
    Form,
    Input,
    Radio,
    Upload,
    Image,
    Button,
    TreeSelect,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { PlusOutlined } from "@ant-design/icons";
import { useAdminCategoriesTree } from "../../productCategories/hooks/useAdminCategoriesTree";
import AdminTitle from "../../../shared/components/AdminTitle";

const AdminProductsCreatePage = () => {
    const [form] = Form.useForm();

    const editorRef = useRef<any>(null);
    const {data: categories} = useAdminCategoriesTree();
    //ảnh
    const [fileList, setFileList] = useState<any[]>([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const uploadButton = (
        <div className="flex flex-col items-center justify-center text-gray-500">
            <PlusOutlined />
            <span className="text-xs mt-2">Upload</span>
        </div>
    );

    const handleChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    };

    const handlePreview = async (file: any) => {
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewOpen(true);
    };

    //submit form
    const onFinish = (values: any) => {
        const payload = {
            ...values,
            description: editorRef.current?.getContent() || "",
            content: editorRef.current?.getContent() || "",
            images: fileList,
        };

        console.log("SUBMIT DATA:", payload);
    };

    return (
        <div className="flex flex-col gap-5">
            <AdminTitle title="Add New Product" description="Create and manage product information" />
            <Card className="rounded-2xl shadow-md">
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        price: 0,
                        discountPercentage: 0,
                        stock: 0,
                        status: "active",
                        featured: false,
                    }}
                    onFinish={onFinish}
                >
                    <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
                        <Card className="col-span-2 rounded-xl space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-5">
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                                <Form.Item label="Title:" name="title">
                                    <Input placeholder="Product title" />
                                </Form.Item>
                                <Form.Item label="Category:" name="category">
                                    <TreeSelect
                                        variant="borderless"
                                        placeholder="Filter category"
                                        className="w-full !border !border-gray-300"
                                        treeData={categories}
                                        allowClear
                                        treeDefaultExpandedKeys={
                                            categories[0]?._id ? [categories[0]._id] : []
                                        }
                                        fieldNames={{
                                            label: "title",
                                            value: "_id",
                                            children: "children"
                                        }}
                                    />
                                            </Form.Item>
                                <Form.Item label="Price:" name="price">
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item label="Discount (%):" name="discountPercentage">
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item label="Stock:" name="stock">
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item label="Position (auto):" name="position">
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item label="Status:" name="status">
                                    <Radio.Group
                                        options={[
                                            { value: "active", label: "Active" },
                                            { value: "inactive", label: "Inactive" },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label="Featured:" name="featured">
                                    <Radio.Group
                                        options={[
                                            { value: true, label: "Yes" },
                                            { value: false, label: "No" },
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                            <Form.Item label="Description:" name="description">
                                <Editor
                                    apiKey="0ewbvj6k7g3emiyhfawtxjqw6oftk4evzqa6j3cpojuej5yg"
                                    onInit={(evt, editor) => (editorRef.current = editor)}
                                    init={{
                                        height: 280,
                                        menubar: false,
                                        plugins: "lists link table code wordcount",
                                        toolbar:
                                            "undo redo | bold italic underline | bullist numlist | link table | code",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="Content:" name="content">
                                <Editor
                                    apiKey="0ewbvj6k7g3emiyhfawtxjqw6oftk4evzqa6j3cpojuej5yg"
                                    init={{
                                        height: 280,
                                        menubar: false,
                                        plugins: "lists link table code",
                                        toolbar:
                                            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | code",
                                    }}
                                />
                            </Form.Item>
                        </Card>
                        <div className="!space-y-5">
                            <Card className="rounded-xl">
                                <Form.Item label="Images:">
                                    <Upload
                                        action="http://localhost:3000/admin/images/upload"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={handleChange}
                                        onPreview={handlePreview}
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                    {previewImage && (
                                        <Image
                                            wrapperStyle={{ display: "none" }}
                                            preview={{
                                                visible: previewOpen,
                                                onVisibleChange: setPreviewOpen,
                                                afterOpenChange: (v) =>
                                                    !v && setPreviewImage(""),
                                            }}
                                            src={previewImage}
                                        />
                                    )}
                                </Form.Item>
                            </Card>
                            <Card className="rounded-xl">
                                <Form.Item label="Bulk Upload:">
                                    <Upload
                                        action="http://localhost:3000/admin/products/bulk"
                                        listType="picture-card"
                                    >
                                        {uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Card>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full h-11"
                            >
                                Create Product
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default AdminProductsCreatePage;
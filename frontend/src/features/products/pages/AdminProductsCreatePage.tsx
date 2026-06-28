import { useState, useRef, useEffect } from "react";
import {
    Card,
    Form,
    Input,
    Radio,
    Upload,
    Image,
    Button,
    TreeSelect,
    message,
    Tag,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { PlusOutlined, StarFilled } from "@ant-design/icons";
import { useAdminCategoriesTree } from "../../productCategories/hooks/useAdminCategoriesTree";
import AdminTitle from "../../../shared/components/AdminTitle";
import { useAdminCreateProduct } from "../hooks/useAdminCreateProduct";

const AdminProductsCreatePage = () => {
    const [form] = Form.useForm();

    const editorRef = useRef<any>(null);
    const { data: categories } = useAdminCategoriesTree();
    //ảnh
    const [fileList, setFileList] = useState<any[]>([]);
    const [mainImageId, setMainImageId] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const {data,loading, error, createProduct} = useAdminCreateProduct();
    
    useEffect(() => {
        if(error){
            message.error(error);
        }
    },[])

    const uploadButton = (
        <div className="flex flex-col items-center justify-center text-gray-500">
            <PlusOutlined />
            <span className="text-xs mt-2">Upload</span>
        </div>
    );

    const handleChange = ({ fileList: newFileList }: any) => {
        const errorFile = newFileList.find(
            (file: any) => file.status === "error"
        );
        if (errorFile) {
            message.error(
                errorFile.response?.message || "Upload thất bại, vui lòng chọn ảnh nhỏ hơn 9MB."
            );
        }
        const updatedList = newFileList.map((file: any) => {
            if (file.response) {
                return {
                    ...file,
                    uid: file.uid,
                    url: file.response.urls,
                };
            }
            return file;
        });
        setFileList(updatedList.slice(0, 10));
    };

    const handlePreview = async (file: any) => {
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewOpen(true);
    };

    const handleSelectMain = (file: any) => {
        setMainImageId(file.uid);
    };

    const onFinish = async (values: any) => {
        const images = fileList
                        .filter((f) => f.status === "done")
                        .map((f) => ({
                            url: Array.isArray(f.url)
                                ? f.url[0]
                                : f.url || f.response?.url,
                            isMain: f.uid === mainImageId,
                        }));
        const payload = {
            ...values,
            description: editorRef.current?.getContent() || "",
            content: editorRef.current?.getContent() || "",
            images: images,
        };
        console.log(payload)
        const result = await createProduct(payload);

        if(result){
            message.success("Product created");
            form.resetFields();
            setFileList([]);
            setMainImageId(null);
        }
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
                                        name="images"
                                        action="http://localhost:3000/admin/api/uploads/images"
                                        listType="picture-card"
                                        multiple
                                        fileList={fileList}
                                        onChange={handleChange}
                                        onPreview={handlePreview}
                                        itemRender={(originNode, file) => {
                                            const isMain = file.uid === mainImageId;

                                            return (
                                                <div
                                                    className="relative group cursor-pointer rounded-lg overflow-hidden"
                                                    onClick={() => handleSelectMain(file)}
                                                >
                                                    {isMain && (
                                                        <Tag
                                                            color="gold"
                                                            className="!absolute !top-2 !right-2 !z-20 m-0 flex items-center gap-1"
                                                        >
                                                            <StarFilled />
                                                            MAIN
                                                        </Tag>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all z-10" />
                                                    <div className="relative">
                                                        {originNode}
                                                    </div>
                                                    {!isMain && (
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-20">
                                                            <span className="bg-black/70 text-white text-xs px-3 py-1 rounded">
                                                                Set as main
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }}
                                    >
                                        {fileList.length >= 10 ? null : uploadButton}
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
                                loading={loading}
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
import { useState, useEffect } from "react";
import { Card, Form, Input, Radio, Upload, Image, Button, TreeSelect, message, Tag, InputNumber, } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { PlusOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import { useAdminCategoriesTree } from "../../productCategories/hooks/useAdminCategoriesTree";
import AdminTitle from "../../../shared/components/AdminTitle";
import { useAdminProduct } from "../hooks/useAdminProduct";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import { useAdminUpdateProduct } from "../hooks/useAdminUpdateProduct";
import { privateClient } from "../../../shared/api/privateClient";
import { updateProductSchema } from "../validations/product.validation";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

const AdminProductsUpdatePage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { productID } = useParams();
    const isValidProductID = typeof productID === "string" && productID.trim() !== "";
    // invalid id
    useEffect(() => {
        if (!isValidProductID) {
            message.error("ID sản phẩm không hợp lệ!");
            navigate("/admin/products");
        }
    }, [isValidProductID, navigate]);
    const { categoriesTree } = useAdminCategoriesTree();
    const {product, loading: loadingProduct, error: errorProduct} = useAdminProduct(isValidProductID ? productID : "");
    const {loading: loadingUpdate,updateProduct} = useAdminUpdateProduct();

    
    //tini-mce
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    // images
    const [fileList, setFileList] = useState<any[]>([]);
    const [mainImageId, setMainImageId] = useState<string | null>(null);
    // preview
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);

    // fill form data
    useEffect(() => {
        if (!product) return;
        // set form values
        form.setFieldsValue({
            title: product.title,
            product_category_id: product.product_category_id?._id,
            price: product.price,
            discountPercentage: product.discountPercentage,
            stock: product.stock,
            position: product.position,
            status: product.status,
            featured: product.featured,
        });
        // set tiny-mce
        setDescription(product.description || "");
        setContent(product.content || "");
        // set images
        if (product.images?.length > 0) {
            const mappedImages = product.images.map(
                (image: any, index: number) => ({
                    uid: image._id || String(index),
                    name: `image-${index}`,
                    status: "done",
                    url: image.url,
                })
            );

            setFileList(mappedImages);

            const mainImage = product.images.find(
                (image: any) => image.isMain
            );

           if (mainImage) {
                const foundImage = mappedImages.find(
                    (item: any) => item.url === mainImage.url
                );
                if (foundImage) {
                    setMainImageId(foundImage.uid);
                }
            }
        }
    }, [product, form]);
    //button upload
    const uploadButton = (
        <div className="flex flex-col items-center justify-center text-gray-500">
            <PlusOutlined />
            <span className="mt-2 text-xs">Upload</span>
        </div>
    );
    // handle kiểm tra lỗi ảnh và thông báo, và update lại ảnh khi người dùng thay đổi ảnh
    const handleChange = ({ fileList: newFileList }: any) => {
        const errorFile = newFileList.find(
            (file: any) => file.status === "error"
        );

        if (errorFile) {
            return message.error(
                errorFile.response?.message ||
                    "Upload ảnh thất bại. Vui lòng thử lại!"
            );
        }

        const updatedList = newFileList.map((file: any) => {
            if (file.response) {
                return {
                    ...file,
                    url: file.response.urls,
                };
            }

            return file;
        });

        setFileList(updatedList.slice(0, 10));
    };
    // Hàm preview ảnh
    const handlePreview = async (file: any) => {
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewOpen(true);
    };
    // hàm chọn ảnh main
    const handleSelectMain = (file: any) => {
        setMainImageId(file.uid);
    };
    // hàm submit form
    const onFinish = async (values: any) => {
        if (!isValidProductID) {
            return message.error("ID sản phẩm không hợp lệ!");
        }
        // lấy ra danh sách ảnh chuẩn format để gửi lên server
        const images = fileList
            .filter((file) => file.status === "done")
            .map((file) => ({
                url: Array.isArray(file.url)
                    ? file.url[0]
                    : file.url || file.response?.urls?.[0],
                isMain: file.uid === mainImageId,
            }));
        // lấy ra payload để validate với zod
        const payload = {
            ...values,
            price: Number(values.price),
            discountPercentage: Number(values.discountPercentage),
            stock: Number(values.stock),
            position: Number(values.position),
            description,
            content,
            images,
        };
        // validate payload với zod
        const parsed = updateProductSchema.safeParse(payload);
        if (!parsed.success) {
            // chuyển lỗi từ zod sang format của Ant Design Form và set lỗi lên form
            const formErrors = zodToAntFormErrors(parsed.error);
            form.setFields(
                Object.keys(formErrors).map((key) => ({
                    name: key,
                    errors: formErrors[key],
                }))
            );
            return;
        }
        try{
            const result = await updateProduct(parsed.data, productID);
            message.success(result.message);
            navigate("/admin/products");
        }catch(error){
            message.error(getErrorMessage(error))
        }
    };

    if (loadingProduct) {
        return <LoadingScreen />;
    }

    if (errorProduct) {
        return <CustomAlert error={errorProduct} />;
    }

    return (
        <div className="flex flex-col gap-5">
            <AdminTitle
                title="Update Product"
                description="Update and manage product information"
            />

            <Card className="rounded-2xl shadow-md">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
                        {/* left */}
                        <Card className="col-span-2 rounded-xl">
                            <h2 className="mb-5 text-xl font-semibold text-gray-900">
                                Basic Information
                            </h2>

                            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                                <Form.Item
                                    label="Title:"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập tên sản phẩm!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Product title" />
                                </Form.Item>

                                <Form.Item
                                    label="Category:"
                                    name="product_category_id"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng chọn danh mục!",
                                        },
                                    ]}
                                >
                                    <TreeSelect
                                        variant="borderless"
                                        placeholder="Select category"
                                        className="w-full !border !border-gray-300"
                                        treeData={categoriesTree}
                                        allowClear
                                        treeDefaultExpandedKeys={
                                            categoriesTree?.[0]?._id
                                                ? [categoriesTree[0]._id]
                                                : []
                                        }
                                        fieldNames={{
                                            label: "title",
                                            value: "_id",
                                            children: "children",
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Price:"
                                    name="price"
                                >
                                    <InputNumber
                                        min={0}
                                        className="!w-full"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Discount (%):"
                                    name="discountPercentage"
                                >
                                    <InputNumber
                                        min={0}
                                        className="!w-full"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Stock:"
                                    name="stock"
                                >
                                    <InputNumber
                                        min={0}
                                        className="!w-full"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Position:"
                                    name="position"
                                >
                                    <InputNumber
                                        min={0}
                                        className="!w-full"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Status:"
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

                                <Form.Item
                                    label="Featured:"
                                    name="featured"
                                >
                                    <Radio.Group
                                        options={[
                                            {
                                                value: true,
                                                label: "Yes",
                                            },
                                            {
                                                value: false,
                                                label: "No",
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item label="Description:">
                                <Editor
                                    apiKey="0ewbvj6k7g3emiyhfawtxjqw6oftk4evzqa6j3cpojuej5yg"
                                    value={description}
                                    onEditorChange={(value) => setDescription(value)}
                                    init={{
                                        height: 280,
                                        menubar: false,
                                        plugins:
                                            "lists link table code wordcount",
                                        toolbar:
                                            "undo redo | bold italic underline | bullist numlist | link table | code",
                                    }}
                                />
                            </Form.Item>

                            <Form.Item label="Content:">
                                <Editor
                                    apiKey="0ewbvj6k7g3emiyhfawtxjqw6oftk4evzqa6j3cpojuej5yg"
                                    value={content}
                                    onEditorChange={(value) => setContent(value)}
                                    init={{
                                        height: 280,
                                        menubar: false,
                                        plugins:
                                            "lists link table code",
                                        toolbar:
                                            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | code",
                                    }}
                                />
                            </Form.Item>
                        </Card>

                        {/* right */}
                        <div className="space-y-5">
                            <Card className="rounded-xl">
                                <Form.Item label="Images:">
                                    <Upload
                                        name="images"
                                        customRequest={async ({ file, onSuccess, onError }) => {
                                            try {
                                                const formData = new FormData();
                                                formData.append("images", file as Blob);
                                                const res = await privateClient.post(
                                                    "/admin/api/uploads/images",
                                                    formData,
                                                    {
                                                        headers: {
                                                            "Content-Type": "multipart/form-data"
                                                        }
                                                    }
                                                );
                                                onSuccess?.(res.data);
                                            } catch (error) {
                                                onError?.(error as Error);
                                            }
                                        }}
                                        listType="picture-card"
                                        multiple
                                        fileList={fileList}
                                        onChange={handleChange}
                                        onPreview={handlePreview}
                                        itemRender={(originNode, file) => {
                                            const isMain =
                                                file.uid === mainImageId;

                                            return (
                                                <div
                                                    className="group relative cursor-pointer overflow-hidden rounded-lg"
                                                    onClick={() =>
                                                        handleSelectMain(
                                                            file
                                                        )
                                                    }
                                                >
                                                    {isMain && (
                                                        <Tag
                                                            color="gold"
                                                            className="!absolute !right-2 !top-2 !z-20 m-0 flex items-center gap-1"
                                                        >
                                                            <StarFilled />
                                                            MAIN
                                                        </Tag>
                                                    )}

                                                    <div className="absolute inset-0 z-10 bg-black/0 transition-all group-hover:bg-black/30" />

                                                    <div className="relative">
                                                        {originNode}
                                                    </div>

                                                    {!isMain && (
                                                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                                                            <span className="rounded bg-black/70 px-3 py-1 text-xs text-white">
                                                                Set as main
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }}
                                    >
                                        {fileList.length >= 10
                                            ? null
                                            : uploadButton}
                                    </Upload>

                                    {previewImage && (
                                        <Image
                                            wrapperStyle={{
                                                display: "none",
                                            }}
                                            preview={{
                                                visible: previewOpen,
                                                onVisibleChange:
                                                    setPreviewOpen,
                                                afterOpenChange: (
                                                    visible
                                                ) =>
                                                    !visible &&
                                                    setPreviewImage(""),
                                            }}
                                            src={previewImage}
                                        />
                                    )}
                                </Form.Item>
                            </Card>

                            <Button
                                loading={loadingUpdate}
                                type="primary"
                                htmlType="submit"
                                className="h-11 w-full"
                            >
                                Update Product
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default AdminProductsUpdatePage;
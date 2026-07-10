import { useEffect, useState } from "react";
import { Button, Card, Checkbox, Form, Image, Input, message, Typography, Upload } from "antd";
import { PlusOutlined, UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, EditOutlined } from "@ant-design/icons";
import AdminTitle from "../../../shared/components/AdminTitle";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { privateClient } from "../../../shared/api/privateClient";
import { useGetMeAdmin } from "../hooks/useGetMeAdmin";
import { useUpdateMeAdmin } from "../hooks/useUpdateMeAdmin";
import { updateMeSchema } from "../validations/auth.validation";
const { Title, Text } = Typography;

const MyAccountAdminPage = () => {
    const [form] = Form.useForm();
    const changePassword = Form.useWatch("changePassword", form);
    const { me, loading, error, refetch } = useGetMeAdmin();
    const { updateMe, loading: updatingMe } = useUpdateMeAdmin();
    // Toggle Edit Mode State
    const [isEditing, setIsEditing] = useState(false);
    // Upload avatar state
    const [fileList, setFileList] = useState<any[]>([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);

    useEffect(() => {
        if (!me) return;

        form.setFieldsValue({
            fullName: me.fullName,
            email: me.email,
            phone: me.phone,
            password: "",
            confirmPassword: "",
            changePassword: false
        });

        if (me.avatar) {
            setFileList([
                {
                    uid: "-1",
                    name: "avatar",
                    status: "done",
                    url: me.avatar,
                },
            ]);
        }
    }, [me, form]);

    const uploadButton = (
        <div className="flex flex-col items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors">
            <PlusOutlined className="text-xl mb-1" />
            <span className="text-xs font-medium">Upload</span>
        </div>
    );

    const handleChange = ({ fileList: newFileList }: any) => {
        const errorFile = newFileList.find(
            (file: any) => file.status === "error"
        );

        if (errorFile) {
            return message.error(
                errorFile.response?.message ?? "Upload avatar failed"
            );
        }

        const updatedList = newFileList.map((file: any) => {
            if (file.response) {
                return {
                    ...file,
                    url: Array.isArray(file.response.data.urls)
                        ? file.response.data.urls[0]
                        : file.response.data.urls,
                };
            }
            return file;
        });

        setFileList(updatedList.slice(-1));
    };

    const handlePreview = (file: any) => {
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewOpen(true);
    };

    const onFinish = async (values: any) => {
        const avatar = fileList.length > 0
            ? Array.isArray(fileList[0].url)
                ? fileList[0].url[0]
                : fileList[0].url || fileList[0].response?.urls?.[0]
            : null;
        const submitData = {
            ...values,
            avatar
        };

        delete submitData.changePassword;
        delete submitData.confirmPassword;

        if (!values.changePassword) {
            delete submitData.password;
        }

        const parsed = updateMeSchema.safeParse(submitData);
        if (!parsed.success) {
            const formErrors = zodToAntFormErrors(parsed.error);
            form.setFields(
                Object.entries(formErrors).map(([name, errors]) => ({
                    name,
                    errors,
                }))
            );
            return;
        }
        try {
            const result = await updateMe(parsed.data);
            if (result.success) {
                message.success(result.message);
                setIsEditing(false);
                await refetch();
            }
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    };

    if (loading) return <LoadingScreen />;
    if (error) return <CustomAlert error={error} />;
    if (!me) return <CustomAlert error="User not found" />;

    return (
        <div className="flex flex-col gap-5 max-w-5xl mx-auto w-full p-4">
            {/* Header Title Section with Edit Checkbox on the same row */}
            <div className="flex justify-between items-end flex-wrap gap-4 border-b border-gray-100">
                <AdminTitle
                    title="Update User"
                    description="Update administrator information"
                />
                {/* Checkbox aligned on the same row with Title */}
                <div className={`flex items-center px-4 py-2 rounded-xl border transition-all ${isEditing ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                    <Checkbox
                        disabled={false}
                        checked={isEditing}
                        onChange={(e) => {
                            setIsEditing(e.target.checked);
                            if (!e.target.checked) {
                                form.resetFields();
                            }
                        }}
                    >
                        <span className="inline-flex items-center gap-1.5 ml-1 font-medium select-none text-sm">
                            <EditOutlined /> Edit Information
                        </span>
                    </Checkbox>
                </div>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={isEditing}
                disabled={!isEditing}
                className="w-full"
            >
                <Card className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Two Columns Layout using Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">

                        {/* COLUMN 1: Avatar Box (Left side) */}
                        <div className="md:col-span-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-6 md:min-h-[280px]">
                            <Form.Item label={<span className="font-semibold text-gray-700">Avatar</span>} className="w-full flex flex-col items-center justify-center">
                                <div className="mt-2">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        maxCount={1}
                                        customRequest={async ({ file, onSuccess, onError }) => {
                                            try {
                                                const formData = new FormData();
                                                formData.append("images", file as Blob);

                                                const res = await privateClient.post("/admin/api/uploads/images",
                                                    formData,
                                                    { headers: { "Content-Type": "multipart/form-data" } }
                                                );
                                                onSuccess?.(res.data);
                                            } catch (error) {
                                                onError?.(error as Error);
                                            }
                                        }}
                                        fileList={fileList}
                                        onChange={handleChange}
                                        onPreview={handlePreview}
                                    >
                                        {fileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </div>
                            </Form.Item>
                            <div className="text-center -mt-2">
                                <Text className="font-semibold block text-sm text-gray-700">Profile Image</Text>
                                <Text type="secondary" className="text-xs max-w-[150px] block mt-1 leading-tight">
                                    Supported formats: JPG, PNG. Max 2MB.
                                </Text>
                            </div>
                        </div>

                        {/* COLUMN 2: Basic Information & Password Box (Right side) */}
                        <div className="md:col-span-3 flex flex-col gap-5">
                            <div>
                                <Title level={4} className="!mb-4 text-gray-800">
                                    Basic Information
                                </Title>

                                {/* Grid Inputs */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <Form.Item
                                        label={<span className="font-semibold text-gray-600 text-xs">Full Name</span>}
                                        name="fullName"
                                    >
                                        <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Enter full name" className="h-10 rounded-lg" />
                                    </Form.Item>

                                    <Form.Item
                                        label={<span className="font-semibold text-gray-600 text-xs">Email Address</span>}
                                        name="email"
                                    >
                                        <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Enter email" className="h-10 rounded-lg" />
                                    </Form.Item>

                                    <Form.Item
                                        label={<span className="font-semibold text-gray-600 text-xs">Phone Number</span>}
                                        name="phone"
                                    >
                                        <Input prefix={<PhoneOutlined className="text-gray-400" />} placeholder="Enter phone number" className="h-10 rounded-lg" />
                                    </Form.Item>
                                </div>
                            </div>

                            {/* Password Box wrapped inside Basic Information Section */}
                            <div className={`p-4 rounded-xl border transition-all ${changePassword ? 'bg-amber-50/40 border-amber-200' : 'bg-gray-50/50 border-gray-100'}`}>
                                <Form.Item
                                    name="changePassword"
                                    valuePropName="checked"
                                    className="!mb-0"
                                >
                                    <Checkbox className="font-semibold text-gray-700">
                                        Change Password
                                    </Checkbox>
                                </Form.Item>

                                {changePassword && (
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                                        <Form.Item
                                            label={<span className="font-semibold text-gray-600 text-xs">New Password</span>}
                                            name="password"
                                        >
                                            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Enter new password" className="h-10 rounded-lg" />
                                        </Form.Item>
                                        <Form.Item
                                            label={<span className="font-semibold text-gray-600 text-xs">Confirm Password</span>}
                                            name="confirmPassword"
                                            dependencies={["password", "changePassword"]}
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!getFieldValue("changePassword")) return Promise.resolve();
                                                        const password = getFieldValue("password");
                                                        if (!password) return Promise.reject(new Error("Please enter a new password"));
                                                        if (!value) return Promise.reject(new Error("Please confirm your password"));
                                                        if (password !== value) return Promise.reject(new Error("Passwords do not match"));
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Confirm new password" className="h-10 rounded-lg" />
                                        </Form.Item>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    {/* Submit and Cancel Actions Row inside the card footer */}
                    {isEditing && (
                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
                            <Button
                                className="h-10 px-5 rounded-xl border-gray-300 font-medium"
                                onClick={() => {
                                    setIsEditing(false);
                                    form.resetFields();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={updatingMe}
                                className="h-10 px-6 rounded-xl font-medium shadow-md shadow-indigo-100 bg-indigo-600 hover:bg-indigo-500 border-none"
                            >
                                Update User
                            </Button>
                        </div>
                    )}
                </Card>
            </Form>
            {/* Hidden Preview Image Component */}
            {previewImage && (
                <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: setPreviewOpen,
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </div>
    );
};

export default MyAccountAdminPage;
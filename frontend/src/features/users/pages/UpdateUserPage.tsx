import { useEffect, useState } from "react";
import { Button, Card, Checkbox, Form, Image, Input, message, Radio, Select, Typography, Upload, } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import AdminTitle from "../../../shared/components/AdminTitle";
import LoadingScreen from "../../../shared/components/LoadingScreen";
import CustomAlert from "../../../shared/components/CustomAlert";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { updateUserSchema } from "../validations/user.validation";
import { useUpdateUserAdmin } from "../hooks/useUpdateUserAdmin";
import { useAdminRoles } from "../../roles/hooks/useAdminRoles";
import { useUserAdmin } from "../hooks/useUserAdmin";
import { privateClient } from "../../../shared/api/privateClient";
const { Title } = Typography;

const UpdateUserPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { userID } = useParams();
    const changePassword = Form.useWatch( "changePassword", form );
    const { user, loading, error } = useUserAdmin(userID);
    const { updateUser, loading: updating, } = useUpdateUserAdmin();
    const { roles, loading: roleLoading, } = useAdminRoles();

    // upload avatar
    const [fileList, setFileList] = useState<any[]>([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);

    useEffect(() => {
        if (!user) return;

        form.setFieldsValue({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            accountType: user.accountType,
            status: user.status,
            roleID: user.roleID._id,
            password: "",
            confirmPassword: "",
        });

        if (user.avatar) {
            setFileList([
                {
                    uid: "-1",
                    name: "avatar",
                    status: "done",
                    url: user.avatar,
                },
            ]);
        }
    }, [user, form]);

    const uploadButton = (
        <div className="flex flex-col items-center justify-center text-gray-500">
            <PlusOutlined />
            <span className="mt-2 text-xs">
                Upload
            </span>
        </div>
    );

    const handleChange = ({ fileList: newFileList }: any) => {
        const errorFile = newFileList.find(
            (file: any) => file.status === "error"
        );

        if (errorFile) {
            return message.error(
                errorFile.response?.message ??
                    "Upload avatar failed"
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
        setPreviewImage(
            file.url || file.thumbUrl
        );
        setPreviewOpen(true);
    };

    const onFinish = async (values: any) => {
        const avatar = fileList.length > 0
                        ? Array.isArray(fileList[0].url)
                            ? fileList[0].url[0]
                            : fileList[0].url ||
                            fileList[0].response?.urls?.[0]
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

        const parsed = updateUserSchema.safeParse( submitData );
        if (!parsed.success) {
            const formErrors = zodToAntFormErrors( parsed.error );
            form.setFields(
                Object.entries(
                    formErrors
                ).map(
                    ([name, errors]) => ({
                        name,
                        errors,
                    })
                )
            );
            return;
        }
        try {
            const result = await updateUser( userID!, parsed.data );
            if (result.success) {
                message.success( result.message );
                navigate("/admin/users");
            }
        } catch (error) {
            message.error(
                getErrorMessage(error)
            );
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }
    if (error) {
        return (
            <CustomAlert error={error} />
        );
    }
    if (!user) {
        return (
            <CustomAlert error="User not found" />
        );
    }
    return (
        <div className="flex flex-col gap-5">
            <AdminTitle
                title="Update User"
                description="Update administrator information"
            />
            <Card className="rounded-2xl shadow-md">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Title level={4} className="!mb-5">
                        Basic Information
                    </Title>
                    <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                        >
                            <Input placeholder="Enter full name" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>
                        <Form.Item
                            label="Role"
                            name="roleID"
                        >
                            <Select
                                loading={roleLoading}
                                placeholder="Select role"
                                options={roles.map((role) => ({
                                    label: role.title,
                                    value: role._id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                        >
                            <Input placeholder="Enter phone number" />
                        </Form.Item>
                        <Form.Item
                            label="Account Type"
                            name="accountType"
                        >
                            <Select
                                options={[
                                    {
                                        label: "Admin",
                                        value: "admin",
                                    },
                                    {
                                        label: "User",
                                        value: "user",
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                        >
                            <Radio.Group
                                options={[
                                    {
                                        label: "Active",
                                        value: "active",
                                    },
                                    {
                                        label: "Inactive",
                                        value: "inactive",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </div>
                    <Card
                        size="small"
                        className="mt-5 bg-gray-50"
                    >
                        <Form.Item
                            name="changePassword"
                            valuePropName="checked"
                            className="!mb-0"
                        >
                            <Checkbox>
                                Change Password
                            </Checkbox>
                        </Form.Item>
                        {changePassword && (
                            <div className="mt-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
                                <Form.Item
                                    label="New Password"
                                    name="password"
                                >
                                    <Input.Password placeholder="Enter new password" />
                                </Form.Item>
                                <Form.Item
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    dependencies={[
                                        "password",
                                        "changePassword",
                                    ]}
                                    rules={[
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!getFieldValue("changePassword")) {
                                                    return Promise.resolve();
                                                }
                                                const password = getFieldValue("password");

                                                if (!password) {
                                                    return Promise.reject(
                                                        new Error(
                                                            "Please enter a new password"
                                                        )
                                                    );
                                                }
                                                if (!value) {
                                                    return Promise.reject(
                                                        new Error(
                                                            "Please confirm your password"
                                                        )
                                                    );
                                                }
                                                if (password !== value) {
                                                    return Promise.reject(
                                                        new Error(
                                                            "Passwords do not match"
                                                        )
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm new password" />
                                </Form.Item>
                            </div>
                        )}
                    </Card>
                    <div className="mt-5">
                        <Form.Item label="Avatar">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                maxCount={1}
                                customRequest={async ({ file, onSuccess, onError, }) => {
                                    try {
                                        const formData = new FormData();
                                        formData.append( "images", file as Blob );

                                        const res = await privateClient.post( "/admin/api/uploads/images", 
                                            formData,
                                            {
                                                headers: { "Content-Type": "multipart/form-data", },
                                            }
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
                                {fileList.length >= 1
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
                                        afterOpenChange: (visible) =>
                                            !visible &&
                                            setPreviewImage(""),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Form.Item>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={updating}
                            className="h-11 px-8"
                        >
                            Update User
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default UpdateUserPage;
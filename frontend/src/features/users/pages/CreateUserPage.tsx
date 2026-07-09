import { Button, Card, Form, Input, message, Select, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import AdminTitle from "../../../shared/components/AdminTitle";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { createUserSchema } from "../validations/user.validation";
import { useCreateUserAdmin } from "../hooks/useCreateUserAdmin";
import { useAdminRoles } from "../../roles/hooks/useAdminRoles";
const { Title } = Typography;

const CreateUserPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { createUser, loading } = useCreateUserAdmin();
    const { roles, loading: roleLoading } = useAdminRoles();

    const onFinish = async (values: any) => {
        const parsed = createUserSchema.safeParse(values);

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
            const result = await createUser(parsed.data);

            if (result.success) {
                message.success(result.message);
                navigate("/admin/users");
            }
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <AdminTitle
                title="Add New Admin"
                description="Create a new administrator account"
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

                    <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
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
                            label="Password"
                            name="password"
                        >
                            <Input.Password placeholder="Enter password" />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="roleID"
                        >
                            <Select
                                loading={roleLoading}
                                placeholder="Select role"
                                options={roles.map((item) => ({
                                    label: item.title,
                                    value: item._id,
                                }))}
                            />
                        </Form.Item>
                    </div>

                    <div className="flex justify-center mt-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="h-11 px-8"
                        >
                            Create User
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default CreateUserPage;
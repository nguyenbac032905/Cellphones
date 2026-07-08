import { Button, Card, Checkbox, Divider, Form, Input, message, Typography } from "antd";
import AdminTitle from "../../../shared/components/AdminTitle";
import { useAdminCreateRole } from "../hooks/useAdminCreateRole";
import { useNavigate } from "react-router-dom";
import { createRoleSchema } from "../validations/role.validation";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { permissionGroups } from "../constants/role.const";

const { TextArea } = Input;
const { Title } = Typography;

const CreateRolePage = () => {
    const [form] = Form.useForm();
    const { createRole, loading } = useAdminCreateRole();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const permissions = permissionGroups.flatMap( (group) => values[group.title.toLowerCase()] ?? [] );

        const createBody = {
            title: values.title,
            description: values.description,
            permissions,
        };
        //validate dữ liệu và thông báo lỗi
        const parsed = createRoleSchema.safeParse(createBody);
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
            const result = await createRole(parsed.data);
            if(result.success){
                message.success(result.message);
                navigate("/admin/roles");
            }
        } catch (error) {
            message.error(getErrorMessage(error))
        }
    };
    return (
        <div className="flex flex-col gap-5">
            <AdminTitle
                title="Add New Role"
                description="Create and manage role information"
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

                    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                        <Form.Item
                            label="Role Name:"
                            name="title"
                        >
                            <Input placeholder="Enter role name" />
                        </Form.Item>

                        <Form.Item
                            label="Description:"
                            name="description"
                        >
                            <TextArea
                                rows={1}
                                placeholder="Enter description"
                            />
                        </Form.Item>
                    </div>
                    <Title level={4} className="!mb-5">
                        Permissions
                    </Title>
                    <div className="space-y-5">
                        {permissionGroups.map((group, index) => {
                            const fieldName = group.title.toLowerCase();

                            const selectedPermissions = Form.useWatch(fieldName, form) || [];

                            const allValues = group.permissions.map((p) => p.value);

                            const checkAll = selectedPermissions.length === allValues.length;
                            return (
                                <div key={group.title} className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <Title level={5} className="!mb-0">
                                            {group.title}
                                        </Title>

                                        <Checkbox
                                            checked={checkAll}
                                            onChange={(e) => {
                                                form.setFieldValue(
                                                    fieldName,
                                                    e.target.checked ? allValues : []
                                                );
                                            }}
                                        >
                                            Select all
                                        </Checkbox>
                                    </div>

                                    <Form.Item
                                        name={fieldName}
                                        className="!mb-0"
                                    >
                                        <Checkbox.Group
                                            className="grid grid-cols-4 gap-y-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
                                            options={group.permissions}
                                        />
                                    </Form.Item>

                                    <Divider />
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center mt-6">
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            className="h-11 px-8"
                        >
                            Create Role
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default CreateRolePage;
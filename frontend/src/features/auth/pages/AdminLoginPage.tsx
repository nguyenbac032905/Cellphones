import {Button,Checkbox,Form,Input,message,Typography} from "antd";

import {LockOutlined, MailOutlined } from "@ant-design/icons";
import { useAdminLogin } from "../hooks/useAdminLogin";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../auth.slice";
import { useAppDispatch } from "../../../app/hooks";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { loginSchema } from "../validations/auth.validation";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";

const { Title, Text } = Typography;

const AdminLoginPage = () => {
    const [form] = Form.useForm();
    const {loading, login} = useAdminLogin();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async (values: {email: string, password: string}) => {
        const parsed = loginSchema.safeParse(values);
        if(!parsed.success){
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
            const result = await login(parsed.data);
            if(result.success){
                message.success(result.message);
                dispatch(setAuth(result.data));
                navigate("/admin/");
            }
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    }
    return (
        <div
            className=" min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative overflow-hidden "
            style={{ backgroundImage: "url('/Shape.png')", backgroundColor: "#4880FF" }}
        >
            <div className="absolute inset-0 bg-black/20" />
            <div className=" relative z-10 w-full max-w-md rounded-3xl bg-white shadow-2xl p-8 md:p-10 " >
                <div className="text-center mb-8">
                    <Title level={2} className="!mb-2" > Admin Login </Title>
                    <Text type="secondary"> Login to access the admin dashboard </Text>
                </div>
                <Form
                    form={form}
                    onFinish={onSubmit}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[ { required: true, message: "Please enter your email" } ]}
                    >
                        <Input type={"email"} prefix={ <MailOutlined /> } placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[ { required: true, message: "Please enter your password" } ]}
                    >
                        <Input.Password prefix={ <LockOutlined /> } placeholder="Enter your password" />
                    </Form.Item>
                    <div className="flex items-center justify-between mb-6">
                        <Checkbox> Remember me </Checkbox>
                        <button type="button" className=" text-blue-500 hover:text-blue-600 text-sm font-medium " > Forgot password? </button>
                    </div>
                    <Form.Item className="!mb-0">
                        <Button loading={loading} type="primary" htmlType="submit" block className="!h-12 !rounded-xl" > Sign In </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
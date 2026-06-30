import {
    Button,
    Checkbox,
    Form,
    Input,
    message,
    Typography
} from "antd";

import {
    LockOutlined,
    MailOutlined
} from "@ant-design/icons";
import { useAdminLogin } from "../hooks/useAdminLogin";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../auth.slice";
import { useAppDispatch } from "../../../app/hooks";
import { store } from "../../../app/store";

const { Title, Text } = Typography;

const AdminLoginPage = () => {
    const [form] = Form.useForm();
    const {error, loading, login} = useAdminLogin();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async (values: {email: string, password: string}) => {
        try {
            const data = await login(values.email, values.password);
            if(data){
                message.success(data.message);
                dispatch(setAuth(data));
                const state = store.getState().auth;
                console.log(state);
                navigate("/admin/");
            }else{
                message.error(error || "Login failed");
            }
        } catch (error) {
            message.error("Login fail");
        }
    }
    return (
        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                px-4
                bg-cover
                bg-center
                relative
                overflow-hidden
            "
            style={{
                backgroundImage: "url('/Shape.png')",
                backgroundColor: "#4880FF"
            }}
        >
            <div className="absolute inset-0 bg-black/20" />
            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-md
                    rounded-3xl
                    bg-white
                    shadow-2xl
                    p-8
                    md:p-10
                "
            >
                <div className="text-center mb-8">
                    <Title
                        level={2}
                        className="!mb-2"
                    >
                        Admin Login
                    </Title>

                    <Text type="secondary">
                        Login to access the admin dashboard
                    </Text>
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
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter your email"
                            }
                        ]}
                    >
                        <Input
                            type={"email"}
                            prefix={
                                <MailOutlined />
                            }
                            placeholder="Enter your email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter your password"
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined />
                            }
                            placeholder="Enter your password"
                        />
                    </Form.Item>

                    <div className="flex items-center justify-between mb-6">
                        <Checkbox>
                            Remember me
                        </Checkbox>

                        <button
                            type="button"
                            className="
                                text-blue-500
                                hover:text-blue-600
                                text-sm
                                font-medium
                            "
                        >
                            Forgot password?
                        </button>
                    </div>

                    <Form.Item className="!mb-0">
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            block
                            className="!h-12 !rounded-xl"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
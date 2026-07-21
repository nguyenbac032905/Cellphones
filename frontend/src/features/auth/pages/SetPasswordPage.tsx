
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import BoxLeft from "../components/BoxLeft";
import { setPasswordSchema, type SetPasswordBody } from "../validations/auth.validation";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useSetPassword } from "../hooks/useSetPassword";

const SetPasswordPage = () => {
    const [form] = Form.useForm();
    const { loading, setPassword } = useSetPassword()
    const navigate = useNavigate();

    const handleSubmit = async (values: SetPasswordBody&{ confirmPassword: string }) => {
        const { confirmPassword, ...registerData } = values;

        const parsed = setPasswordSchema.safeParse(registerData);
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
            const result = await setPassword(parsed.data);
            message.success(result.message);
            navigate("/login");
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    };
    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-7 bg-white">
            <BoxLeft />
            <div className="md:col-span-3 flex justify-center bg-white">
                <div className="max-w-[500px] w-full flex flex-col gap-5 px-6 py-10 md:px-10 md:py-12 mx-auto">
                    <h1 className="text-center text-primary-500 font-bold text-2xl md:text-[32px] tracking-wide uppercase">ĐĂNG KÝ SMEMBER</h1>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <Form.Item
                            name="fullName"
                            className="!mb-0"
                            label={
                                <label className="text-sm md:text-base font-medium text-neutral-700"> Họ và tên: </label>
                            }
                        >
                            <Input
                                placeholder="Nhập họ và tên"
                                className="!p-3 !rounded-xl !border !border-neutral-300 focus:!border-primary-500 text-sm focus:!shadow-none"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            className="!mb-0"
                            label={
                                <label className="text-sm md:text-base font-medium text-neutral-700"> Mật khẩu: </label>
                            }
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu"
                                className="!rounded-xl !border !border-neutral-300 focus-within:!border-primary-500 focus-within:!shadow-none text-sm"
                                styles={{
                                    input: {
                                        padding: "9px",
                                        fontSize: "14px",
                                    },
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={["password"]}
                            className="!mb-0"
                            label={
                                <label className="text-sm md:text-base font-medium text-neutral-700"> Xác nhận mật khẩu: </label>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng xác nhận mật khẩu.",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(
                                            new Error("Mật khẩu xác nhận không khớp.")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder="Nhập lại mật khẩu"
                                className="!rounded-xl !border !border-neutral-300 focus-within:!border-primary-500 focus-within:!shadow-none text-sm"
                                styles={{
                                    input: {
                                        padding: "9px",
                                        fontSize: "14px",
                                    },
                                }}
                            />
                        </Form.Item>

                        <Button
                            loading={loading}
                            htmlType="submit"
                            className="!h-auto !p-3 !rounded-xl !bg-primary-500 hover:!bg-red-700 !text-white !font-bold tracking-wide shadow-sm !border-0"
                        >
                            Đăng ký
                        </Button>
                    </Form>

                    <div className="flex gap-2 justify-center text-sm md:text-base">
                        <span className="text-neutral-500">Bạn đã có tài khoản?</span>
                        <Link to={"/login"} className="!text-primary-500 font-bold hover:underline">Đăng nhập ngay</Link>
                    </div>

                    <div className="flex flex-col gap-1 items-center text-xs md:text-sm text-neutral-400 border-t border-neutral-100 pt-4 mt-2">
                        <p>Mua sắm, sửa chữa tại</p>
                        <div className="flex gap-2 justify-center font-medium">
                            <Link to={"/"} className="!text-primary-500 hover:underline">Cellphones.com.vn</Link>
                            <span>và</span>
                            <Link to={"/"} className="!text-primary-500 hover:underline">dienthoaivui.com.vn</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetPasswordPage;
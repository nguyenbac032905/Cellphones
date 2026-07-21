import { Link, useNavigate } from "react-router-dom";
import BoxLeft from "../components/BoxLeft";
import { Button, Form, Input, message } from "antd";
import { loginSchema, type LoginBody } from "../validations/auth.validation";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { useLogin } from "../hooks/useLogin";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useAppDispatch } from "../../../app/hooks";
import { setAuth } from "../auth.slice";

const LoginPage = () => {
    const [form] = Form.useForm();
    const {login, loading} = useLogin();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: LoginBody) => {
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
            message.success(result.message);
            dispatch(setAuth(result.data));
            navigate("/");
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    };
    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-7 bg-white">
            <BoxLeft />
            <div className="md:col-span-3 flex justify-center bg-white">
                <div className="max-w-[500px] w-full flex flex-col gap-5 px-6 py-10 md:px-10 md:py-12 mx-auto">
                    <h1 className="text-center text-primary-500 font-bold text-2xl md:text-[32px] tracking-wide uppercase">Đăng nhập SMEMBER</h1>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <Form.Item
                            name="email"
                            className="!mb-0"
                            label={ <label className="text-sm md:text-base font-medium text-neutral-700"> Email: </label> }
                        >
                            <Input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className="!p-3 !rounded-xl !border !border-neutral-300 focus:!border-primary-500 focus:!shadow-none transition-colors text-sm"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            className="!mb-0"
                            label={ <label className="text-sm md:text-base font-medium text-neutral-700"> Mật khẩu: </label> }
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu của bạn"
                                className="!p-3 !rounded-xl !border !border-neutral-300 focus-within:!border-primary-500 focus-within:!shadow-none transition-colors text-sm"
                            />
                        </Form.Item>

                        <div className="text-right">
                            <Link to={"/"} className="text-sm !text-[#3b82f6] hover:underline" > Quên mật khẩu? </Link>
                        </div>
                        <Button
                            loading={loading}
                            htmlType="submit"
                            className="!h-auto !p-3 !rounded-xl !bg-primary-500 hover:!bg-red-700 !text-white !font-bold tracking-wide shadow-sm !border-0"
                        >
                            Đăng nhập
                        </Button>
                    </Form>

                    <div className="flex items-center gap-4 my-1">
                        <div className="h-[1px] bg-neutral-200 flex-1"></div>
                        <div className="text-xs text-neutral-400 uppercase font-semibold tracking-wider">Hoặc đăng nhập bằng</div>
                        <div className="h-[1px] bg-neutral-200 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors p-3.5 flex items-center justify-center gap-1.5 text-sm font-medium text-neutral-700 shadow-sm">
                            <img src="https://cdn-static.smember.com.vn/_next/static/media/logo-google.b6f9570f.svg" alt="Google" />
                            <span>Google</span>
                        </button>
                        <button className="rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors p-3.5 flex items-center justify-center gap-1.5 text-sm font-medium text-neutral-700 shadow-sm">
                            <img src="https://cdn-static.smember.com.vn/_next/static/media/logo-zalo.120d889f.svg" alt="Zalo" />
                            <span>Zalo</span>
                        </button>
                    </div>

                    <div className="flex gap-2 justify-center text-sm md:text-base">
                        <span className="text-neutral-500">Bạn chưa có tài khoản?</span>
                        <Link to={"/register"} className="!text-primary-500 font-bold hover:underline">Đăng ký ngay</Link>
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

export default LoginPage;
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import BoxLeft from "../components/BoxLeft";
import { registerSchema } from "../validations/auth.validation";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";

const RegisterPage = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values: { email: string }) => {
        const parsed = registerSchema.safeParse(values);
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
        console.log(parsed);
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
                            name="email"
                            className="!mb-0"
                            label={
                                <label className="text-sm md:text-base font-medium text-neutral-700">
                                    Email:
                                </label>
                            }
                        >
                            <Input
                                type="text"
                                placeholder="Nhập email của bạn"
                                className="!p-3 !rounded-xl !border !border-neutral-300 focus:!border-primary-500 transition-colors text-sm ring-0 focus:!shadow-none"
                            />
                        </Form.Item>

                        <Button
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

export default RegisterPage;
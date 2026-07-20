import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import BoxLeft from "../components/BoxLeft";
import { registerSchema, verifyOtpSchema } from "../validations/auth.validation";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import { useRegister } from "../hooks/useRegister";
import { useVerifyOtp } from "../hooks/useVerifyOtp";

const OTP_EXPIRE_TIME = 5*60;

const OtpVerifyPage = () => {
    const [form] = Form.useForm();
    const [countdown, setCountdown] = useState(OTP_EXPIRE_TIME);
    const {loading: resending, register} = useRegister();
    const {loading, verifyOtp} = useVerifyOtp();
    const navigate = useNavigate();
    const {state} = useLocation();
    const email = state.email;

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const minutes = String(Math.floor(countdown / 60)).padStart(2, "0");
    const seconds = String(countdown % 60).padStart(2, "0");

    const handleSubmit = async (values: {otp: string}) => {
        const parsed = verifyOtpSchema.safeParse({otp: values.otp, email: email});

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
            const result = await verifyOtp(parsed.data);
            message.success(result.message);
            navigate(`/set-password`)
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    };

    const handleResendOtp = async () => {
        const parsed = registerSchema.safeParse({email});
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
            const result = await register(parsed.data);
            message.success(result.message);
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-7 bg-white">
            <BoxLeft />
            <div className="md:col-span-3 flex justify-center bg-white">
                <div className="w-full max-w-[500px] px-6 py-10 md:px-10 md:py-12 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-center text-primary-500 font-bold text-2xl md:text-[32px] uppercase tracking-wide">
                            XÁC NHẬN MÃ OTP
                        </h1>
                        <p className="text-center text-sm text-neutral-500 leading-6">
                            Nhập mã OTP gồm <span className="font-semibold">6 chữ số</span> đã được
                            gửi tới email của bạn.
                        </p>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        <Form.Item
                            name="otp"
                            className="!mb-0"
                            label={
                                <label className="text-sm md:text-base font-medium text-neutral-700">
                                    Mã OTP
                                </label>
                            }
                        >
                            <Input
                                maxLength={6}
                                placeholder="Nhập mã OTP"
                                className="!p-3 !rounded-xl !border !border-neutral-300 focus:!border-primary-500 transition-colors text-sm focus:!shadow-none"
                            />
                        </Form.Item>

                        <div className="flex flex-col items-center gap-1">
                            <p className="text-sm text-neutral-500">
                                Mã OTP sẽ hết hạn sau
                            </p>
                            <span className="font-bold text-primary-500 text-lg tabular-nums">
                                {minutes}:{seconds}
                            </span>
                            <div className="flex justify-center">
                                {countdown > 0 ? (
                                    <span className="text-sm text-neutral-400"> Bạn có thể gửi lại mã sau khi hết thời gian. </span>
                                ) : (
                                    <Button
                                        type="link"
                                        loading={resending}
                                        onClick={handleResendOtp}
                                        className="!p-0 !h-auto !text-primary-500 !font-semibold"
                                    >
                                        Gửi lại mã OTP
                                    </Button>
                                )}
                            </div>
                        </div>
                        <Button
                            loading={loading}
                            htmlType="submit"
                            className="!h-auto !p-3 !rounded-xl !bg-primary-500 hover:!bg-red-700 !text-white !font-bold tracking-wide shadow-sm !border-0"
                        >
                            Xác minh mã OTP
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

export default OtpVerifyPage;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftSlide, VoucherIcon } from "../../../shared/components/Icons";
import { UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, ShoppingOutlined, CreditCardOutlined, BankOutlined, MoneyCollectOutlined, CheckCircleFilled, } from "@ant-design/icons";
import { useAppSelector } from "../../../app/hooks";
import { Input, Select, Form, Radio } from "antd";

const PROVINCES_MOCK = [
    { value: 1123, label: "Hà Nội" },
    { value: 1124, label: "TP. Hồ Chí Minh" },
    { value: 1125, label: "Đà Nẵng" },
];
const WARDS_MOCK: Record<number, { value: number; label: string }[]> = {
    1123: [
        { value: 113, label: "Vĩnh Tuy" },
        { value: 114, label: "Dịch Vọng" },
        { value: 115, label: "Hàng Bạc" },
    ],
    1124: [
        { value: 201, label: "Bến Nghé" },
        { value: 202, label: "Thảo Điền" },
    ],
    1125: [{ value: 301, label: "Hải Châu I" }],
};

const CheckoutPage = () => {
    const [form] = Form.useForm();
    const cart = useAppSelector((state) => state.cart.cart);
    const ids = JSON.parse(sessionStorage.getItem("selectedProductIDs") ?? "[]");
    const products = cart?.products.filter((item) => ids.includes(item.productID._id)) ?? [];
    const navigate = useNavigate();

    const [selectedProvince, setSelectedProvince] = useState<number>(1123);

    const handleProvinceChange = (value: number) => {
        setSelectedProvince(value);
        form.setFieldsValue({ ward: undefined });
    };

    const onFinish = (values: any) => {
        console.log("Thanh toán thành công với thông tin:", values);
    };

    return (
        <div className="flex flex-col gap-4 mt-4 xl:px-1 px-2 min-h-[70vh] mb-10">
            <div className="flex sm:items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3 sm:px-4 bg-white shadow-sm">
                <Link
                    to={"/"}
                    className="text-xs whitespace-nowrap flex items-center justify-center gap-1.5 !text-blue-600 hover:!text-blue-700 rounded-lg px-2 py-1.5 hover:!bg-blue-50 transition-colors font-medium"
                >
                    <ArrowLeftSlide className="size-4" />
                    <span className="text-sm">Quay lại trang giỏ hàng</span>
                </Link>
                <div className="max-sm:hidden bg-[#dbe8fe] text-sm rounded-lg px-4 py-1.5 text-neutral-800 flex items-center gap-2">
                    <strong className="text-[#2570eb]">Miễn phí vận chuyển </strong>với đơn hàng từ 300.000đ
                </div>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    paymentMethod: "cod",
                }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
            >
                <div className="lg:col-span-8 flex flex-col gap-5">
                    {/* Danh sách sản phẩm */}
                    <div className="flex flex-col gap-4 bg-white rounded-xl p-4 sm:p-5 border border-neutral-200/80 shadow-sm">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                            <div className="flex items-center gap-2 font-semibold text-base sm:text-lg">
                                <ShoppingOutlined className="text-primary-500 text-lg" />
                                <span>Danh sách sản phẩm thanh toán <span className="max-sm:hidden">({products.length} sản phẩm)</span></span>
                            </div>
                        </div>

                        {products.length > 0 ? (
                            <div className="divide-y divide-neutral-100">
                                {products.map((item) => (
                                    <div className="py-3 flex items-center justify-between gap-3 sm:gap-4" key={item._id}>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-neutral-100 p-1 flex items-center justify-center shrink-0 bg-neutral-50/50">
                                                <img
                                                    className="w-full h-full object-contain"
                                                    src={item.productID.mainImage}
                                                    alt={item.productID.title}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col gap-1 min-w-0">
                                            <p
                                                className="text-xs sm:text-sm font-semibold !text-neutral-800 line-clamp-2"
                                            >
                                                {item.productID.title}
                                            </p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-sm sm:text-base font-bold text-primary-500">
                                                    {Math.round(
                                                        item.productID.price * (1 - item.productID.discountPercentage / 100)
                                                    ).toLocaleString("vi-VN")}
                                                    đ
                                                </span>
                                                <span className="text-xs text-neutral-400 line-through">
                                                    {item.productID.price.toLocaleString("vi-VN")}đ
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 border border-neutral-200 rounded-lg bg-neutral-50 shrink-0 px-3 py-1 text-xs sm:text-sm font-medium text-neutral-700">
                                            Số lượng: <b>{item.quantity}</b>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 text-neutral-500 text-sm">
                                Vui lòng chọn sản phẩm trong giỏ hàng để thanh toán
                            </div>
                        )}
                    </div>

                    {/* Form thông tin người nhận và Địa chỉ */}
                    <div className="flex flex-col gap-4 bg-white rounded-xl p-4 sm:p-5 border border-neutral-200/80 shadow-sm">
                        <div className="flex items-center gap-2 font-semibold text-base sm:text-lg">
                            <UserOutlined />
                            <span>Thông tin nhận hàng</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item
                                name="fullName"
                                className="!mb-0"
                                label={<span className="text-xs sm:text-sm font-medium text-neutral-700">Họ và tên:</span>}
                            >
                                <Input
                                    size="large"
                                    prefix={<UserOutlined className="text-neutral-400 mr-1" />}
                                    placeholder="Họ và tên người nhận"
                                    className="rounded-lg"
                                />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                className="!mb-0"
                                label={<span className="text-xs sm:text-sm font-medium text-neutral-700">Số điện thoại:</span>}
                            >
                                <Input
                                    size="large"
                                    prefix={<PhoneOutlined className="text-neutral-400 mr-1" />}
                                    placeholder="Số điện thoại liên hệ"
                                    className="rounded-lg"
                                />
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="email"
                            className="!mb-0"
                            label={<span className="text-xs sm:text-sm font-medium text-neutral-700">Email nhận thông báo:</span>}
                        >
                            <Input
                                size="large"
                                type="email"
                                prefix={<MailOutlined className="text-neutral-400 mr-1" />}
                                placeholder="Địa chỉ email"
                                className="rounded-lg"
                            />
                        </Form.Item>

                        <div className="flex items-center gap-2 font-semibold text-base sm:text-lg text-neutral-800 pt-2 border-t border-neutral-200 mt-2">
                            <EnvironmentOutlined />
                            <span>Địa chỉ giao hàng</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Form.Item
                                name="province"
                                className="!mb-0"
                                label={<span className="text-xs sm:text-sm font-medium text-neutral-700">Tỉnh / Thành phố:</span>}
                            >
                                <Select
                                    placeholder="-- Chọn Tỉnh / Thành phố --"
                                    size="large"
                                    onChange={handleProvinceChange}
                                    options={PROVINCES_MOCK}
                                    className="w-full rounded-lg"
                                />
                            </Form.Item>
                            <Form.Item
                                name="ward"
                                className="!mb-0"
                                label={<span className="text-xs sm:text-sm font-medium text-neutral-700">Phường / Xã:</span>}
                            >
                                <Select
                                    placeholder="-- Chọn Phường / Xã --"
                                    size="large"
                                    options={WARDS_MOCK[selectedProvince] || []}
                                    className="w-full rounded-lg"
                                />
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="address"
                            className="!mb-0"
                            label={<span className="text-xs sm:text-sm font-medium text-neutral-700">Số nhà, tên đường:</span>}
                        >
                            <Input
                                size="large"
                                prefix={<EnvironmentOutlined className="text-neutral-400 mr-1" />}
                                placeholder="Ví dụ: Số 12, ngõ 34..."
                                className="rounded-lg"
                            />
                        </Form.Item>

                        {/* Phương thức thanh toán*/}
                        <div className="flex items-center gap-2 font-semibold text-base sm:text-lgtext-neutral-800 pt-3 border-t border-neutral-200 mt-2">
                            <CreditCardOutlined />
                            <span>Phương thức thanh toán</span>
                        </div>
                        <Form.Item name="paymentMethod" className="!mb-0">
                            <Radio.Group className="flex w-full flex-col">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <Radio value="cod" />
                                    <span className="text-xs font-medium text-neutral-800 sm:text-sm">
                                        Thanh toán khi nhận hàng (COD)
                                    </span>
                                </label>
                                <label className="mt-2 flex cursor-pointer items-center gap-3">
                                    <Radio value="banking" />
                                    <span className="text-xs font-medium text-neutral-800 sm:text-sm">
                                        Chuyển khoản ngân hàng / Mã QR
                                    </span>
                                </label>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                </div>

                <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-4">
                    <div className="flex flex-col gap-4 bg-white rounded-xl p-4 sm:p-5 border border-neutral-200/80 shadow-sm">
                        <h2 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                            Thông tin đơn hàng
                        </h2>
                        <div className="flex items-center justify-between bg-neutral-50 rounded-md py-3 px-2 border border-neutral-100 hover:border-neutral-200 transition-colors">
                            <div className="flex items-center gap-2.5">
                                <VoucherIcon className="size-5 text-primary-500" />
                                <span className="text-xs sm:text-sm font-medium text-neutral-800">
                                    Áp dụng mã giảm giá
                                </span>
                            </div>
                            <button
                                type="button"
                                className="!text-xs !font-bold !text-primary-500 hover:!underline transition-all"
                            >
                                Chọn mã
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 text-sm pt-1">
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-center justify-between text-neutral-600">
                                    <span>Số lượng sản phẩm</span>
                                    <span className="font-semibold text-neutral-800">{products.length}</span>
                                </div>

                                <div className="flex items-center justify-between text-neutral-600">
                                    <span>Tổng tiền hàng</span>
                                    <span className="font-semibold text-neutral-800">816.000đ</span>
                                </div>

                                <div className="flex items-center justify-between text-neutral-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-semibold text-[#34b766]">Miễn phí</span>
                                </div>
                            </div>

                            <div className="border-t border-b border-neutral-100 flex flex-col gap-2.5 py-3">
                                <div className="flex items-center justify-between text-neutral-600">
                                    <span>Giảm giá trực tiếp</span>
                                    <span className="font-semibold text-[#34b766]">-70.000đ</span>
                                </div>
                                <div className="flex items-center justify-between text-neutral-600">
                                    <span>Mã giảm giá</span>
                                    <span className="font-semibold text-[#34b766]">-10.000đ</span>
                                </div>
                            </div>

                            <div className="border-t border-neutral-100 pt-2 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-base text-neutral-900">Tổng tiền</div>
                                        <div className="text-[11px] text-neutral-400">
                                            (Đã bao gồm thuế VAT)
                                        </div>
                                    </div>
                                    <span className="text-lg font-semibold text-primary-500">816.000đ</span>
                                </div>

                                <div className="text-xs flex items-center justify-between text-neutral-600 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                                    <span className="font-medium text-green-800">Bạn đã tiết kiệm được</span>
                                    <span className="font-bold text-[#34b766]">-80.000đ</span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 flex flex-col items-center justify-center rounded-md !text-white p-2 transition-all !bg-primary-500 hover:!bg-primary-600 active:!scale-[0.99] shadow-md hover:shadow-lg cursor-pointer"
                        >
                            <strong className="text-base tracking-wide uppercase font-bold">MUA NGAY</strong>
                            <span className="text-[11px] font-normal opacity-90">
                                Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng
                            </span>
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default CheckoutPage;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftSlide, VoucherIcon } from "../../../shared/components/Icons";
import { UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, ShoppingOutlined, CreditCardOutlined, } from "@ant-design/icons";
import { useAppSelector } from "../../../app/hooks";
import { Input, Select, Form, Radio, message } from "antd";
import { useProvinces } from "../hooks/useProvinces";
import { useDistricts } from "../hooks/useDistricts";
import { useWards } from "../hooks/useWard";
import { useFee } from "../hooks/useFee";
import type { District, Province, Ward } from "../types/checkout.type";
import { createOrderSchema } from "../../orders/validations/order.validation";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { useCreateOrder } from "../../orders/hooks/useCreateOrder";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
type CheckoutFormValues = {
    fullName: string;
    phone: string;
    email: string;
    province: number;
    district: number;
    ward: string;
    address: string;
    paymentMethod: "COD" | "VNPAY";
    note: string;
};
const CheckoutPage = () => {
    const [form] = Form.useForm();
    const {provinces} = useProvinces();
    const {districts, getDistricts} = useDistricts();
    const {wards, getWards} = useWards();
    const {fee, getFee} = useFee();
    const {createOrder} = useCreateOrder();
    const navigate = useNavigate();
    
    //lay ra cart và tính giá sản phẩm
    const cart = useAppSelector((state) => state.cart.cart);
    const ids = JSON.parse(sessionStorage.getItem("selectedProductIDs") ?? "[]");
    const products = cart?.products.filter((item) => ids.includes(item.productID._id)) ?? [];
    //tính tổng tiền hàng
    const subTotal = Math.round(products.reduce((sum, item) => sum + item.productID.price*item.quantity,0));
    //tính tiền giảm giá của sản phẩm
    const directDiscount = Math.round(products.reduce((sum, item) => sum + item.productID.price*(item.productID.discountPercentage/100)*item.quantity,0));
    const discountAmount = directDiscount
    //tính tiền đơn hàng
    const totalOrder = subTotal - discountAmount;
    // kiểm tra có freeship không, nếu không thì cộng cả tiền ship vào
    const isFreeShip = totalOrder >= 300000;
    const totalPrice = totalOrder + (isFreeShip ? 0 : (fee?.total ?? 0));
    //xử lí địa chỉ
    const [selectedProvince, setSelectedProvince] = useState<Province>();
    const [selectedDistrict, setSelectedDistrict] = useState<District>();
    const [selectedWard, setSelectedWard] = useState<Ward>();
    const handleProvinceChange = async (value: number) => {
        const province = provinces.find(p => p.ProvinceID === value);
        if (!province) return;
        setSelectedProvince(province);
        form.setFieldsValue({ district:undefined, ward: undefined });
        await getDistricts(value);
    };
    const handleDistrictChange = async (value: number) => {
        const district = districts.find(d => d.DistrictID === value);
        setSelectedDistrict(district)
        form.setFieldsValue({ ward: undefined });

        await getWards(value);
    };
    const handleWardChange = async (value: string) => {
        const ward = wards.find(w => w.WardCode === value);
        if (!ward || !selectedDistrict) return;
        setSelectedWard(ward);
        const payload = {
            fromDistrictId: 1680,
            fromWardCode: "220101",
            toDistrictId: selectedDistrict?.DistrictID!,
            toWardCode: ward.WardCode,
            height: 10,
            width: 30,
            length: 40,
            weight: 3000,
            insuranceValue: 0,
        }
        await getFee(payload);
    }
    //hàm submit
    const onFinish = async (values: CheckoutFormValues) => {
        const data = {
            products: products.map(item => ({productID: item.productID._id, quantity: item.quantity})),
            fullName: values.fullName,
            phone: values.phone,
            address: values.address,
            province: selectedProvince?.ProvinceName,
            district: selectedDistrict?.DistrictName,
            ward: selectedWard?.WardName,
            districtID: selectedDistrict?.DistrictID,
            wardCode: selectedWard?.WardCode,
            note: values.note,
            paymentMethod: values.paymentMethod
        }
        const parsed = createOrderSchema.safeParse(data);
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
            const result = await createOrder(parsed.data);
            message.success("Tạo đơn hàng thành công");
            
            if(result.nextAction.type === "navigate"){
                navigate(result.nextAction.url);
            }else{
                window.location.href = result.nextAction.url;
            }
        } catch (error) {
            message.error(getErrorMessage(error));
        }
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
                                    value={selectedProvince?.ProvinceID}
                                    placeholder="-- Chọn Tỉnh / Thành phố --"
                                    size="large"
                                    onChange={handleProvinceChange}
                                    options={provinces?.map(item => ({ value: item.ProvinceID, label: item.ProvinceName }))}
                                    className="w-full rounded-lg"
                                />
                            </Form.Item>
                            <Form.Item
                                name="district"
                                className="!mb-0"
                                label={<span className="text-xs sm:text-sm font-medium text-neutral-700">Quận / Huyện:</span>}
                            >
                                <Select
                                    value={selectedDistrict?.DistrictID}
                                    placeholder="-- >Quận / Huyện --"
                                    size="large"
                                    onChange={handleDistrictChange}
                                    options={districts?.map(item => ({ value: item.DistrictID, label: item.DistrictName }))}
                                    className="w-full rounded-lg"
                                />
                            </Form.Item>
                            <Form.Item
                                name="ward"
                                className="!mb-0"
                                label={<span className="text-xs sm:text-sm font-medium text-neutral-700">Phường / Xã:</span>}
                            >
                                <Select
                                    value={selectedWard?.WardCode}
                                    placeholder="-- Chọn Phường / Xã --"
                                    size="large"
                                    onChange={handleWardChange}
                                    options={wards?.map(item => ({ value: item.WardCode, label: item.WardName }))}
                                    className="w-full rounded-lg"
                                />
                            </Form.Item>
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
                            <Form.Item
                                name="note"
                                className="sm:col-span-2 !mb-0"
                                label={
                                    <span className="text-xs sm:text-sm font-medium text-neutral-700">
                                        Ghi chú:
                                    </span>
                                }
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Nhập ghi chú cho đơn hàng (không bắt buộc)"
                                    className="rounded-lg"
                                    showCount
                                    maxLength={300}
                                />
                            </Form.Item>
                        </div>

                        {/* Phương thức thanh toán*/}
                        <div className="flex items-center gap-2 font-semibold text-base sm:text-lgtext-neutral-800 pt-3 border-t border-neutral-200 mt-2">
                            <CreditCardOutlined />
                            <span>Phương thức thanh toán</span>
                        </div>
                        <Form.Item name="paymentMethod" className="!mb-0">
                            <Radio.Group className="flex w-full flex-col">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <Radio value="COD" />
                                    <span className="text-xs font-medium text-neutral-800 sm:text-sm">
                                        Thanh toán khi nhận hàng (COD)
                                    </span>
                                </label>
                                <label className="mt-2 flex cursor-pointer items-center gap-3">
                                    <Radio value="VNPAY" />
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
                                    <span className="font-semibold text-neutral-800">{subTotal.toLocaleString("vi-VN")}đ</span>
                                </div>

                                <div className="flex items-center justify-between text-neutral-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-semibold text-neutral-800">{(isFreeShip ? 0 : (fee?.total ?? 0)).toLocaleString("vi-VN")}đ</span>
                                </div>
                            </div>

                            <div className="border-t border-b border-neutral-100 flex flex-col gap-2.5 py-3">
                                <div className="flex items-center justify-between text-neutral-600">
                                    <span>Giảm giá trực tiếp</span>
                                    <span className="font-semibold text-[#34b766]">-{directDiscount.toLocaleString("vi-VN")}đ</span>
                                </div>
                                <div className="flex items-center justify-between text-neutral-600">
                                    <span>Mã giảm giá</span>
                                    <span className="font-semibold text-[#34b766]">-0đ</span>
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
                                    <span className="text-lg font-semibold text-primary-500">{totalPrice.toLocaleString("vi-VN")}đ</span>
                                </div>

                                <div className="text-xs flex items-center justify-between text-neutral-600 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                                    <span className="font-medium text-green-800">Bạn đã tiết kiệm được</span>
                                    <span className="font-bold text-[#34b766]">-{(discountAmount + (isFreeShip ? (fee?.total ?? 0) : 0)).toLocaleString("vi-VN")}đ</span>
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
import type { District, Province, Ward } from "../types/checkout.type";
import { UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, CreditCardOutlined } from "@ant-design/icons";
import { Input, Select, Form, Radio } from "antd";

export interface CheckoutFormProps {
    provinces: Province[];
    districts: District[];
    wards: Ward[];

    selectedProvince?: Province;
    selectedDistrict?: District;
    selectedWard?: Ward;

    handleProvinceChange: (value: number) => Promise<void>;
    handleDistrictChange: (value: number) => Promise<void>;
    handleWardChange: (value: string) => Promise<void>;
}
const CheckoutForm = ({ provinces, districts, wards, selectedProvince,selectedDistrict,selectedWard,handleProvinceChange,handleDistrictChange,handleWardChange}: CheckoutFormProps) => {
    return (
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
    )
}
export default CheckoutForm;
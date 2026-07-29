import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftSlide, VoucherIcon } from "../../../shared/components/Icons";
import { Form, message } from "antd";
import { useFee } from "../hooks/useFee";
import { createOrderSchema } from "../../orders/validations/order.validation";
import { zodToAntFormErrors } from "../../../shared/utils/zodToAntFormErrors";
import { useCreateOrder } from "../../orders/hooks/useCreateOrder";
import { getErrorMessage } from "../../../shared/utils/errorHandler";
import ProductList from "../components/ProductList";
import { useCheckoutSummary } from "../hooks/useCheckoutSummary";
import { useCheckoutAddress } from "../hooks/useCheckoutAddress";
import CheckoutForm from "../components/CheckoutForm";
import { useState } from "react";
import CouponModal from "../components/CouponModal";
import { useAppSelector } from "../../../app/hooks";
import { useCoupons } from "../../coupons/hooks/useCoupons";
import type { Coupon } from "../../coupons/types/coupon.type";
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
    const navigate = useNavigate();
    //mã giảm giá
    const user = useAppSelector(state => state.auth.user);
    const {coupons}= useCoupons();
    const myCoupons = coupons.filter((coupon: Coupon) => user?.coupons.includes(coupon._id));
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const openCouponModal = () => {
        setIsCouponModalOpen(true);
    };
    const closeCouponModal = () => {
        setIsCouponModalOpen(false);
    };
    // tạo đơn hàng
    const {fee, getFee} = useFee();
    const {createOrder} = useCreateOrder();
    //lay ra cart và tính giá sản phẩm
    const { products, subTotal, directDiscount, discountAmount, isFreeShip, shippingFee, totalPrice, totalSaving, } = useCheckoutSummary(fee);
    //xử lí địa chỉ
    const { provinces, districts, wards, selectedProvince, selectedDistrict, selectedWard, handleProvinceChange, handleDistrictChange, handleWardChange, } = useCheckoutAddress({ form, getFee, });
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
                    <ProductList products={products} />

                    {/* Form thông tin người nhận và Địa chỉ */}
                    <CheckoutForm provinces={provinces} districts={districts} wards={wards} selectedProvince = {selectedProvince} selectedDistrict = {selectedDistrict} selectedWard = {selectedWard} handleProvinceChange={handleProvinceChange} handleDistrictChange={handleDistrictChange} handleWardChange={handleWardChange}/>
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
                                onClick={openCouponModal}
                                type="button"
                                className="!text-xs !font-bold !text-primary-500 hover:!underline transition-all"
                            >
                                Chọn mã
                            </button>
                            <CouponModal isOpenModal={isCouponModalOpen} onCloseModal={closeCouponModal} coupons={myCoupons} selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon}/>
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
                                    <span className="font-semibold text-neutral-800">{(isFreeShip ? 0 : (shippingFee)).toLocaleString("vi-VN")}đ</span>
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
                                    <span className="font-bold text-[#34b766]">-{(totalSaving).toLocaleString("vi-VN")}đ</span>
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
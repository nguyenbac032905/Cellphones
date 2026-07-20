import { Link } from "react-router-dom";
import GiftIcon, { ArrowRightSlide } from "../../../shared/components/Icons";
const BoxLeft = () => {
    return (
        <div className="md:col-span-4 bg-neutral-50 flex flex-col items-center gap-6 px-4 py-8 md:px-8 md:py-12 justify-center border-b md:border-b-0 md:border-r border-neutral-200">
            <div className="flex gap-4">
                <Link to={"/"} className="bg-primary-500 px-4 py-2">
                    <img width={156} height={26} src="https://cdn-static.smember.com.vn/_next/static/media/cellphones-long-icon.6a80e2a6.svg" />
                </Link>
                <Link to={"/"} className="bg-primary-500 px-4 py-2">
                    <img width={156} height={26} src="https://cdn-static.smember.com.vn/_next/static/media/dtv-long-icon.40a11e1d.svg" />
                </Link>
            </div>
            <div className="text-center px-2 text-lg md:text-2xl text-neutral-800 font-medium leading-relaxed mb-1.5">
                <p>
                    Nhập hội khách hàng thành viên <strong className="text-[26px] md:text-[30px] font-black text-primary-500 tracking-wide">SMEMBER</strong>
                </p>
                <p>Để không bỏ lỡ các ưu đãi hấp dẫn từ CellphoneS</p>
            </div>

            <div className="max-w-[650px] w-full flex flex-col px-2">
                <div className="relative rounded-2xl p-5 md:p-8 shadow-sm" style={{ background: "linear-gradient(131deg, #F6F6F6 -0.22%, #ECEBEB 45.23%, #E2E0E0 90.68%)" }}>
                    <div className="absolute bottom-[-3px] right-[-3px] w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-br-2xl border-r-[5px] md:border-r-[6px] border-b-[5px] md:border-b-[6px] border-primary-500">
                        <span className="h-[5px] w-[5px] md:h-[6px] md:w-[6px] rounded-full bg-primary-500 absolute bottom-[-5px] md:bottom-[-6px] left-[-3px]"></span>
                        <span className="h-[5px] w-[5px] md:h-[6px] md:w-[6px] rounded-full bg-primary-500 absolute top-[-3px] right-[-5.5px] md:right-[-5.5px]"></span>
                    </div>
                    <div className="absolute top-[-3px] right-[-3px] w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-tr-2xl border-t-[5px] md:border-t-[6px] border-r-[5px] md:border-r-[6px] border-primary-500">
                        <span className="h-[5px] w-[5px] md:h-[6px] md:w-[6px] rounded-full bg-primary-500 absolute bottom-[-3px] right-[-5px] md:right-[-5.5px]"></span>
                        <span className="h-[5px] w-[5px] md:h-[6px] md:w-[6px] rounded-full bg-primary-500 absolute top-[-5px] md:top-[-6px] left-[-3px]"></span>
                    </div>
                    <div className="absolute top-[-3px] left-[-3px] w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-tl-2xl border-t-[5px] md:border-t-[6px] border-l-[5px] md:border-l-[6px] border-primary-500">
                        <span className="h-[5px] w-[5px] md:h-[6px] md:w-[6px] rounded-full bg-primary-500 absolute bottom-[-3px] left-[-5px] md:left-[-6px]"></span>
                        <span className="h-[5px] w-[5px] md:h-[6px] md:w-[6px] rounded-full bg-primary-500 absolute top-[-5px] md:top-[-6px] right-[-3px]"></span>
                    </div>
                    <div className="absolute bottom-[-3px] left-[-3px] w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-bl-2xl border-l-[5px] md:border-l-[6px] border-b-[5px] md:border-b-[6px] border-primary-500">
                        <span className="h-[5px] w-[5px] md:h-[6px] md:w-[6px] rounded-full bg-primary-500 absolute bottom-[-5px] md:bottom-[-6px] right-[-3px]"></span>
                        <span className="h-[5px] w-[5px] md:h-[6px] md:w-[6px] rounded-full bg-primary-500 absolute top-[-3px] left-[-5px] md:left-[-6px]"></span>
                    </div>
                    <div className="flex flex-col gap-3.5 text-sm text-neutral-700">
                        <div className="flex gap-3 items-start">
                            <GiftIcon className="size-5.5 text-primary-500 shrink-0 mt-0.5" />
                            <p><b>Chiết khấu đến 5%</b> khi mua các sản phẩm mua tại CellphoneS</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <GiftIcon className="size-5.5 text-primary-500 shrink-0 mt-0.5" />
                            <p><b>Miễn phí giao hàng</b> cho thành viên SMEM, SVIP và cho đơn hàng từ 300.000đ</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <GiftIcon className="size-5.5 text-primary-500 shrink-0 mt-0.5" />
                            <p><b>Tặng voucher sinh nhật đến 500.000đ</b> cho khách hàng thành viên</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <GiftIcon className="size-5.5 text-primary-500 shrink-0 mt-0.5" />
                            <p>Trợ giá thu cũ lên đời đến <b>1 triệu</b></p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <GiftIcon className="size-5.5 text-primary-500 shrink-0 mt-0.5" />
                            <p>Thăng hạng nhận voucher <b>đến 300.000đ</b></p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <GiftIcon className="size-5.5 text-primary-500 shrink-0 mt-0.5" />
                            <p>Đặc quyền S-Student/S-Teacher <b>ưu đãi thêm đến 10%</b></p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <GiftIcon className="size-5.5 text-primary-500 shrink-0 mt-0.5" />
                            <p><b>S-Business:</b> Chiết khấu đến 8% dành riêng cho khách hàng doanh nghiệp</p>
                        </div>
                        <Link to={"/"} className="flex items-center justify-center gap-2 mt-2 font-bold !text-primary-500 hover:underline">
                            <p>Xem chi tiết chính sách ưu đãi Smember</p>
                            <ArrowRightSlide className="size-4" />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img width={660} height={476} src="https://cdn-static.smember.com.vn/_next/static/media/smember-promotion-ant.a7833c47.png" alt="Promotion" className="object-contain max-w-[85%] md:max-w-full" />
                </div>
            </div>
        </div>
    )
}
export default BoxLeft
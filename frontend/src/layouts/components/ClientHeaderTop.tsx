import { Link } from "react-router-dom";
import { AwardIcon, ExchangeIcon, OrderIcon, PhoneIcon, ShopIcon, TruckIcon } from "../../shared/components/Icons";
import Marquee from "../../shared/components/Marquee";

const ClientHeaderTop = () => {
    return(
        <div className="flex w-full max-w-[1200px] mx-auto px-2 mt-2 text-xs xl:px-1 h-4.5 gap-6">
            <Marquee speed={0.3} gap={10}>
                <div className="flex items-center gap-3">
                    <div className="flex items-center shrink-0 gap-1 whitespace-nowrap">
                        <AwardIcon />
                        <span>Sản phẩm <strong>Chính hãng - Xuất VAT</strong> đầy đủ</span>
                    </div>
                    <span className="inline-block size-[5px] rounded-full bg-red-200/60 shrink-0"></span>
                    <div className="flex items-center shrink-0 gap-1 whitespace-nowrap">
                        <TruckIcon />
                        <span><strong>Giao nhanh - Miễn phí</strong> cho đơn 300k</span>
                    </div>
                    <span className="inline-block size-[5px] rounded-full bg-red-200/60 shrink-0"></span>
                    <div className="flex items-center shrink-0 gap-1 whitespace-nowrap">
                        <ExchangeIcon />
                        <span><strong>Thu cũ</strong> giá ngon - <strong>Lên đời</strong> tiết kiệm</span>
                    </div>
                    <span className="inline-block size-[5px] rounded-full bg-red-200/60 shrink-0"></span>
                </div>
            </Marquee>
            <div className="md:flex hidden items-center gap-[30px]">
                <Link to={"/"} className="flex items-center gap-1 shrink-0 whitespace-nowrap cursor-pointer hover:scale-95 transition-all duration-300 relative before:w-0.5 before:h-3 before:bg-primary-200 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[15px]">
                    <ShopIcon />
                    <span>Cửa hàng gần bạn</span>
                </Link>
                <Link to={"/"} className="flex items-center gap-1 shrink-0 whitespace-nowrap cursor-pointer hover:scale-95 transition-all duration-300 relative before:w-0.5 before:h-3 before:bg-primary-200 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[15px]">
                    <OrderIcon />
                    <span>Tra cứu đơn hàng</span>
                </Link>
                <Link to={"/"} className="flex items-center gap-1 shrink-0 whitespace-nowrap cursor-pointer hover:scale-95 transition-all duration-300 relative before:w-0.5 before:h-3 before:bg-primary-200 before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[15px]">
                    <PhoneIcon />
                    <span>1800 2097</span>
                </Link>
            </div>
        </div>
    )
}
export default ClientHeaderTop;
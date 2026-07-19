import type { ProductDetailClient } from "../types/products.type";
import { Link } from "react-router-dom";
import { CartIcon, CommentIcon, CpuIcon, FillStar, HeartIcon, PlusBorderIcon } from "../../../shared/components/Icons";
import TicketPromo from "../components/TicketPromo";
const promos = [
    "Chỉ thêm 30K - nhận Sim/Esim 5G VNSKY, có ngay 3GB data/ngày+500 phút gọi Mobifone & VNSKY, miễn phí 30 ngày đầu - chỉ áp dụng tại cửa hàng",
    "Giảm thêm 10% cho Pin dự phòng - Camera giám sát - Đồng hồ trẻ em - Gia dụng - Sức khỏe Làm đẹp khi mua Điện thoại/Laptop",
    "Tặng PMH trị giá 500.000 đ cho AIRPODS MỚI - không áp dụng kèm ưu đãi khác/ HSSV",
    "Tặng PMH trị giá 500.000 đ cho IPAD A16/MINI/AIR MỚI - không áp dụng kèm ưu đãi khác/ HSSV",
    "Tặng PMH trị giá 1.000.000 đ cho IPAD PRO MỚI - không áp dụng kèm ưu đãi khác/ HSSV",
    "Tặng PMH trị giá 1.000.000 đ cho MAC MỚI - không áp dụng kèm ưu đãi khác/ HSSV",
    "Tặng PMH trị giá 1.000.000 đ cho APPLE WATCH SE3/S11/Ultra mới - không áp dụng kèm ưu đãi khác/ HSSV"
];
const ProductInfo = ({ product }: { product: ProductDetailClient }) => {
    const newPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
    return (
        <div className="flex flex-col gap-3 p-2">
            {/* danh gia */}
            <div className="cursor-pointer">
                <h1 className="font-semibold text-2xl mb-2">{product?.title}</h1>
                <div className="flex gap-1">
                    <FillStar className="size-5" />
                    <span>5</span>
                    <span className="text-[#71717A]">(19 đánh giá)</span>
                </div>
            </div>
            {/* yeu thich */}
            <div className="grid grid-cols-2 sm:grid-cols-4">
                <div className="relative flex items-center justify-center cursor-pointer gap-2 text-sm text-[#3b82f6] transition-colors duration-200 hover:text-blue-700">
                    <HeartIcon className="size-5 shrink-0" />
                    <span className="font-medium">Yêu thích</span>
                    <div className="absolute right-0 h-5 w-px bg-neutral-200" />
                </div>
                <div className="relative flex cursor-pointer items-center justify-center gap-2 text-sm text-[#3b82f6] transition-colors duration-200 hover:text-blue-700">
                    <CommentIcon className="size-5 shrink-0" />
                    <span className="font-medium">Hỏi đáp</span>
                    <div className="absolute right-0 h-5 w-px bg-neutral-200" />
                </div>
                <div className="relative flex cursor-pointer items-center justify-center gap-2 text-sm text-[#3b82f6] transition-colors duration-200 hover:text-blue-700">
                    <CpuIcon className="size-5 shrink-0" />
                    <span className="font-medium">Thông số</span>
                    <div className="absolute right-0 h-5 w-px bg-neutral-200" />
                </div>
                <div className="flex cursor-pointer items-center justify-center gap-2 text-sm text-[#3b82f6] transition-colors duration-200 hover:text-blue-700">
                    <PlusBorderIcon className="size-5 shrink-0" />
                    <span className="font-medium">So sánh</span>
                </div>
            </div>
            {/* gia */}
            <div style={{ background: "linear-gradient(to top right, #fcfeff, #eff5ff) padding-box, linear-gradient(to top right, #dbe8fe, #609afa)" }}
                className="rounded-2xl border border-[#4a91e2cb] sm:p-3 p-1"
            >
                <div className="flex items-center justify-between pb-2">
                    <div className="flex-1 text-center">
                        <div className="text-xl font-semibold text-neutral-800">
                            {newPrice.toLocaleString("vi-VN")}đ
                        </div>
                        <div className="text-sm text-gray-400 line-through">
                            {product.price.toLocaleString("vi-VN")}đ
                        </div>
                    </div>

                    <div className="relative flex h-[60px] flex-col items-center justify-center px-4">
                        <div className="absolute top-0 h-[18px] w-[1px] bg-[#4a90e2]/40"></div>
                        <span className="z-10 my-auto text-xs text-gray-500 bg-[#f4f6fa]">Hoặc</span>
                        <div className="absolute bottom-0 h-[18px] w-[1px] bg-[#4a90e2]/40"></div>
                    </div>

                    <div className="flex-1 text-center">
                        <div className="text-sm text-[#217cf4]">
                            Thu cũ lên đời chỉ từ
                        </div>
                        <div className="text-xl font-semibold text-neutral-800">
                            {Math.round(newPrice - Math.min(product.price * 9 / 100, 3000000)).toLocaleString("vi-VN")}đ
                        </div>
                        <div className="text-xs text-gray-700 ">
                            Trợ giá đến <span className="font-bold text-[#217bf4] text-sm mx-1">3 triệu</span>{" "}
                            <Link to={"/"} className="font-medium !text-[#d70018] text-sm">
                                Định giá ngay
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 border-t border-dashed border-[#4a91e2cb] pt-3 mt-1">
                    <img
                        src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/Web/Logo/promotion-icon02.png"
                        alt="smember-icon"
                        className="h-6 w-6 object-contain"
                    />
                    <div className="text-xs text-gray-800">
                        Tiết kiệm lên đến <span className="font-bold text-black">360.000đ</span> cho Smember{" "}
                        <Link to={"/"} className="font-medium !text-[#d70018]">
                            Kiểm tra ngay
                        </Link>
                    </div>
                </div>
            </div>
            {/* khuyen mai */}
            <div style={{ background: "linear-gradient(to top right, #fcfeff, #eff5ff) padding-box, linear-gradient(to top right, #dbe8fe, #609afa)" }}
                className="rounded-2xl border border-[#4a91e2cb] sm:p-3 p-1"
            >
                <div className="flex items-center justify-between pb-2">
                    <div className="flex-1 text-center">
                        <TicketPromo />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 border-t border-dashed border-[#4a91e2cb] pt-3 mt-1">
                    <ul className="flex flex-col gap-3">
                        {promos.map((text, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4a90e2] text-xs font-semibold text-white mt-0.5"> {index + 1} </span>
                                <div className="text-sm leading-relaxed text-gray-800">
                                    <span>{text} </span>
                                    <Link to="/" className="inline-block !text-[#217bf4] hover:underline ml-1 text-[13.5px]" > Xem chi tiết </Link>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* add to cart */}
            <div className="grid grid-cols-2 gap-2">
                <button className="flex flex-col items-center justify-center rounded-xl text-white p-1.5 h-[60px] leading-none transition-all duration-200 bg-gradient-to-t from-primary-500 to-primary-300 hover:from-primary-700">
                    <strong>MUA NGAY</strong>
                    <span className="text-xs">Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng</span>
                </button>
                <button className="flex items-center justify-center gap-1 !border !border-primary-500 rounded-xl !text-primary-500 p-1.5 hover:bg-[#fbe6e8] transition-all duration-200">
                    <CartIcon />
                    <strong >Thêm vào giỏ hàng</strong>
                </button>
            </div>
        </div>
    )
}
export default ProductInfo;
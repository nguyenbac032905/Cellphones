import { Link } from "react-router-dom";
import { ArrowDownIcon, CartIcon, CartMobileIcon, CategoryIcon, LocationIcon, LocationMobileIcon, SearchIcon, UserOutlineIcon } from "../../shared/components/Icons";
const ClientHeaderBottom = () => {
    return (
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-3 px-2 py-4 xl:px-1">
            {/* LOGO CELLPHONES (Tự thích ứng PC / Mobile) */}
            <Link to="/" title="CellphoneS" className="flex h-10 items-center transition-all duration-300 md:hover:scale-95">
                <div className="flex w-0 items-center overflow-hidden transition-all duration-200 lg:w-[169px]">
                    <img alt="CellphoneS Logo" loading="lazy" width="530" height="95" className="object-contain" src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/Web/Logo/Logo_CPS.png" />
                </div>
                <div className="h-10 w-10 overflow-hidden transition-all duration-200 lg:h-0 lg:w-0">
                    <img alt="CellphoneS Logo" loading="lazy" width="350" height="400" className="object-contain" src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/Web/Logo/Logo-CPS-m.png" />
                </div>
            </Link>
            {/* NÚT DANH MỤC (Chỉ hiện trên PC) */}
            <button className="bg-primary-300 hover:bg-primary-500 hidden items-center justify-center gap-2 cursor-pointer border-none text-base px-4 py-1 min-h-[40px] rounded-lg text-white md:flex">
                <CategoryIcon />
                <span>Danh mục</span>
                <ArrowDownIcon />
            </button>
            {/* NÚT CHỌN KHU VỰC (Chỉ hiện trên PC) */}
            <button className="bg-primary-300 hover:bg-primary-500 hidden items-center justify-center gap-1 cursor-pointer border-none text-base px-4 py-1 min-h-[40px] rounded-lg text-white h-10 md:flex">
                <LocationIcon />
                <span>Hà Nội</span>
                <ArrowDownIcon />
            </button>
            {/* THANH TÌM KIẾM */}
            <div className="flex-1 relative">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="z-10 w-full overflow-hidden rounded-lg text-neutral-600 flex items-center gap-2 px-3 bg-white h-[40px] border border-neutral-300 focus-within:border-none focus-within:ring-2 focus-within:ring-primary-500">
                        <div className="flex items-center justify-center">
                            <SearchIcon />
                        </div>
                        <input className="w-full bg-transparent text-sm placeholder-neutral-400 text-black" placeholder="Bạn muốn mua gì hôm nay?"/>
                    </div>
                </form>
            </div>
            {/* NÚT GIỎ HÀNG (Chỉ hiện chữ trên PC) */}
            <span className="hover:bg-primary-500 hidden items-center justify-center gap-2 cursor-pointer min-h-[40px] rounded-lg text-white border-none bg-transparent md:flex px-3">
                <span className="hidden lg:inline-block text-sm">Giỏ hàng</span>
                <span className="relative">
                    <CartIcon />
                </span>
            </span>
            {/* NÚT ĐĂNG NHẬP (Chỉ hiện trên PC) */}
            <button className="max-md:hidden bg-primary-300 hover:bg-primary-500 flex items-center justify-center gap-2 cursor-pointer border-none text-sm px-4 py-1 min-h-[40px] rounded-lg text-white min-w-[115px]" type="button">
                <span>Đăng nhập</span>
                <span className="relative">
                    <UserOutlineIcon />
                </span>
            </button>
            {/* NÚT CHỌN KHU VỰC RÚT GỌN (Chỉ hiện trên MOBILE) */}
            <button className="bg-primary-300 hover:bg-primary-500 flex items-center justify-center gap-1 cursor-pointer border-none text-white h-10 px-2 rounded-lg md:hidden">
                <LocationMobileIcon />
                <div className="flex flex-col items-start leading-tight">
                    <span className="text-[9px] opacity-80">Xem giá tại</span>
                    <span className="text-xs font-semibold">Hà Nội</span>
                </div>
            </button>
            {/* ICON GIỎ HÀNG RÚT GỌN (Chỉ hiện trên MOBILE) */}
            <a className="relative flex px-1 md:hidden text-white align-middle justify-center items-center" href="/cart">
                <CartMobileIcon />
            </a>
        </div>
    )
}
export default ClientHeaderBottom;
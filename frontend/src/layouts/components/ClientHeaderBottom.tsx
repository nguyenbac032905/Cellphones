import { Link, useNavigate } from "react-router-dom";
import { ArrowDownIcon, CartIcon, CartMobileIcon, CategoryIcon, LocationIcon, LocationMobileIcon, SearchIcon, UserOutlineIcon } from "../../shared/components/Icons";
import { useAppSelector } from "../../app/hooks";
import { Badge, Dropdown, message } from "antd";
import { UserOutlined, LogoutOutlined, ShoppingOutlined, GiftOutlined, EnvironmentOutlined, CrownOutlined, } from "@ant-design/icons";
import { getLastName } from "../../shared/utils/getLastName";
import { useLogout } from "../../features/auth/hooks/useLogout";
import { getErrorMessage } from "../../shared/utils/errorHandler";
const ClientHeaderBottom = () => {
    const user = useAppSelector(state => state.auth.user);
    const navigate = useNavigate();
    const { logout } = useLogout();
    const handleLogout = async () => {
        try {
            const resLogout = await logout();
            navigate("/login", {replace: true});
            message.success(resLogout.message);
        } catch (error) {
            message.error(getErrorMessage(error));
        }
    }
    const cart = useAppSelector(state => state.cart.cart);
    console.log(cart)
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
            {/* NÚT GIỎ HÀNG */}
            <Link
                to="/cart"
                className="hover:bg-white/10 hidden min-h-[40px] cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-transparent px-3 text-white transition-colors md:flex"
            >
                <span className="hidden text-sm font-medium lg:inline-block">
                    Giỏ hàng
                </span>

                <div className="relative flex items-center justify-center">
                    <CartIcon className="size-6 text-white" />

                    {!!cart?.products.length && (
                        <span className="absolute -top-1 -right-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#ff4d4f] px-1 text-[8px] font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] ring-2 ring-white">
                            {cart.products.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                    )}
                </div>
            </Link>
            {/* NÚT ĐĂNG NHẬP (Chỉ hiện trên PC) */}
            {user ? (
                <Dropdown
                    trigger={["click"]}
                    placement="bottomRight"
                    popupRender={() => (
                        <div className="w-55 overflow-hidden rounded-lg border border-neutral-100 bg-white shadow-2xl transition-all">
                            {/* HEADER TÀI KHOẢN (Style Smember) */}
                            <div className="border-b border-neutral-200 p-2">
                                <div className="flex items-center gap-3">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user?.fullName || "Avatar"}
                                            className="h-11 w-11 shrink-0 rounded-full object-cover border border-primary-500"
                                        />
                                        ) : (
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500 font-bold text-white text-base">
                                            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                                        </div>
                                    )}
                                    <div className="flex flex-col min-w-0">
                                        <p className="truncate font-bold text-neutral-900 text-sm leading-snug"> {user?.fullName} </p>
                                        <p className="truncate text-xs text-neutral-500">{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                            {/* DANH SÁCH MENU */}
                            <div className="p-1.5 space-y-0.5">
                                <button
                                    onClick={() => navigate("/my-account/orders")}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-red-50 hover:text-primary-500 cursor-pointer"
                                >
                                    <ShoppingOutlined className="text-base text-neutral-500 group-hover:text-primary-500" />
                                    <span>Đơn hàng của tôi</span>
                                </button>

                                <button
                                    onClick={() => navigate("/my-account")}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-red-50 hover:text-primary-500 cursor-pointer"
                                >
                                    <UserOutlined className="text-base text-neutral-500 group-hover:text-primary-500" />
                                    <span>Thông tin tài khoản</span>
                                </button>

                                <button
                                    onClick={() => navigate("/my-account/vouchers")}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-red-50 hover:text-primary-500 cursor-pointer"
                                >
                                    <GiftOutlined className="text-base text-neutral-500 group-hover:text-primary-500" />
                                    <span>Ưu đãi của tôi</span>
                                </button>
                            </div>
                            {/* NÚT ĐĂNG XUẤT */}
                            <div className="border-t border-neutral-100 p-1.5 bg-neutral-50/50">
                                <button
                                    onClick={() => handleLogout()}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-primary-500 transition-colors hover:bg-red-100/70 cursor-pointer"
                                >
                                <LogoutOutlined className="text-base text-primary-500" />
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        </div>
                    )}
                    >
                    <button className="max-md:hidden bg-primary-300 hover:bg-primary-500 flex min-h-[40px] min-w-[115px] cursor-pointer items-center justify-center gap-2 rounded-lg border-none px-4 py-1 text-sm text-white transition-all">
                        <UserOutlineIcon />
                        <span>{getLastName(user?.fullName || "")}</span>
                        <ArrowDownIcon />
                    </button>
                    </Dropdown>
            ) : (
                <Link to={"/login"} className="max-md:hidden bg-primary-300 hover:bg-primary-500 flex items-center justify-center gap-2 cursor-pointer border-none text-sm px-4 py-1 min-h-[40px] rounded-lg text-white min-w-[115px]" type="button">
                    <span>Đăng nhập</span>
                    <span className="relative">
                        <UserOutlineIcon />
                    </span>
                </Link>
            )}
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
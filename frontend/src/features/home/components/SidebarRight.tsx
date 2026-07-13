import { Link } from "react-router-dom";
import GiftIcon, { ChevronRightIcon } from "../../../shared/components/Icons";

const SidebarRight = () => {
    return (
        <div className="w-55 shrink-0 space-y-2 flex-col hidden md:flex">
            <div className="bg-white py-2 px-3 rounded-xl shadow-50 text-neutral-800">
                <div className="flex gap-2">
                    <div style={{background: "linear-gradient(180deg, #FFF5F0 0%, #F4C8D0 100%)"}} className="flex items-center justify-center rounded-full size-10.5">
                        <span className="size-7">
                            <img className="w-full h-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:50/plain/https://cellphones.com.vn/media/wysiwyg/ant-smile.png" />
                        </span>
                    </div>
                    <p className="text-sm flex-1 font-bold leading-[1.5]">Chào mừng bạn đến với CellphoneS</p>
                </div>
                <p className="mt-1 text-xs leading-[1.5]">Nhập hội thành viên Smember để không bỏ lỡ các ưu đãi hấp dẫn.</p>
                <div className="my-1 text-xs leading-6 flex gap-1">
                    <Link to={"/login"} className="!text-primary-500 hover:!text-primary-300">Đăng nhập</Link>
                    <span className="text-neutral-400">hoặc</span>
                    <Link to={"/login"} className="!text-primary-500 hover:!text-primary-300">Đăng ký</Link>
                </div>
                <Link to={""} className="flex gap-2 text-xs items-center hover:!text-primary-500">
                    <GiftIcon className="text-primary-500 size-4.5"/>
                    <span>Xem ưu đãi Smember</span>
                    <ChevronRightIcon className="ml-auto size-5"/>
                </Link>
            </div>
            <div className="flex-1 bg-white py-3 px-3 rounded-xl shadow-50 text-neutral-800 flex flex-col gap-3 text-xs space-y-2 text-neutral-800">
                <div className="flex flex-col gap-2">
                    <Link to={"/"} className="!bg-black-alpha-200 hover:!bg-black-alpha-300 rounded-md py-1 text-center font-bold">
                        Ưu đãi cho giáo dục
                    </Link>
                    <Link to={"/"} className="flex items-center gap-2">
                        <span className="size-4.5">
                            <img width={18} height={18} className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:18:18/q:100/plain/https://cellphones.com.vn/media/wysiwyg/icon_student_home_190825.png"/>
                        </span>
                        <div className="flex-1">
                            Đăng ký <b>nhận ưu đãi</b>
                        </div>
                    </Link>
                    <Link to={"/"} className="flex items-center gap-2">
                        <span className="size-4.5">
                            <img width={18} height={18} className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:18:18/q:100/plain/https://cellphones.com.vn/media/wysiwyg/icon_student_home_190825.png"/>
                        </span>
                        <div className="flex-1">
                            Deal hot <b>học sinh sinh viên</b>
                        </div>
                    </Link>
                    <Link to={"/laptop"} className="flex items-center gap-2">
                        <span className="size-4.5">
                            <img width={18} height={18} className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:18:18/q:100/plain/https://cellphones.com.vn/media/wysiwyg/icon_student_home_190825.png"/>
                        </span>
                        <div className="flex-1">
                            Laptop <b>ưu đãi khủng</b>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <Link to={"/"} className="!bg-black-alpha-200 hover:!bg-black-alpha-300 rounded-md py-1 text-center font-bold">
                        Thu cũ lên đời giá hời
                    </Link>
                    <Link to={"/"} className="flex items-center gap-2">
                        <span className="size-4.5">
                            <img width={18} height={18} className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:18:18/q:100/plain/https://cellphones.com.vn/media/wysiwyg/icon_repeat_home_190825.png"/>
                        </span>
                        <div className="flex-1">
                            Iphone trợ giá <b>đến 3 triệu</b>
                        </div>
                    </Link>
                    <Link to={"/"} className="flex items-center gap-2">
                        <span className="size-4.5">
                            <img width={18} height={18} className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:18:18/q:100/plain/https://cellphones.com.vn/media/wysiwyg/icon_repeat_home_190825.png"/>
                        </span>
                        <div className="flex-1">
                            Samsung trợ giá <b>đến 3 triệu</b>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <Link to={"/"} className="!bg-black-alpha-200 hover:!bg-black-alpha-300 rounded-md py-1 text-center font-bold">
                        Khách hàng doanh nghiệp (B2B)
                    </Link>
                    <Link to={"/"} className="flex items-center gap-2">
                        <span className="size-4.5">
                            <img width={18} height={18} className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:18:18/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Icon_wrapper.png"/>
                        </span>
                        <div className="flex-1">
                            Đăng ký <b>S-Bussiness</b>
                        </div>
                    </Link>
                    <Link to={"/"} className="flex items-center gap-2">
                        <span className="size-4.5">
                            <img width={18} height={18} className="w-full" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:18:18/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Icon_wrapper.png"/>
                        </span>
                        <div className="flex-1">
                            Chính sách <b>ưu đãi</b>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SidebarRight;
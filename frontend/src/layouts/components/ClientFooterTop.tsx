export default function ClientFooterTop() {
    const payments = [
        { title: "Apple Pay", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/apple-pay-og.png", url: "https://cellphones.com.vn/sforum/apple-pay-viet-nam" },
        { title: "Vnpay", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/logo/payment/vnpay-logo.png", url: "https://cellphones.com.vn/sforum/vnpay-la-gi-cach-dang-ky-vnpay-thanh-toan-vnpay-chi-tiet" },
        { title: "MoMo", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/momo_1.png", url: "https://cellphones.com.vn/huong-dan-thanh-toan-qua-vi-momo-cellphones" },
        { title: "Onepay", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/logo/payment/onepay-logo.png", url: "https://cellphones.com.vn/huong-dan-mua-hang-va-thanh-toan-qua-cong-onepay" },
        { title: "Kredivo", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/logo/payment/kredivo-logo.png", url: "https://cellphones.com.vn/uu-dai-doi-tac/kredivo" },
        { title: "Zalopay", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/logo/payment/zalopay-logo.png", url: "https://cellphones.com.vn/sforum/huong-dan-toan-bang-zalopay-khi-mua-hang-tren-website-cellphones" },
        { title: "Fundiin", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/fundiin.png", url: "https://cellphones.com.vn/huong-dan-thanh-toan-qua-cong-fundiin-tren-website-cellphones" },
    ];
    const policies = [
        { title: "Mua hàng và thanh toán Online", url: "/chinh-sach-giao-hang" },
        { title: "Mua hàng trả góp", url: "/tra-gop" },
        { title: "Mua hàng trả góp bằng thẻ tín dụng", url: "/huong-dan-mua-hang-tra-gop-bang-the-tin-dung-tai-cellphones" },
        { title: "Chính sách giao hàng", url: "/chinh-sach-giao-hang" },
        { title: "Chính sách đổi trả", url: "/tos?part=refund-policy" },
        { title: "Tra điểm Smember", url: "https://smember.com.vn?company_id=cellphones", nofollow: true },
        { title: "Xem ưu đãi Smember", url: "/uu-dai-smember" },
        { title: "Tra thông tin bảo hành", url: "https://smember.com.vn/warranty?company_id=cellphones", nofollow: true },
        { title: "Tra cứu hoá đơn điện tử", url: "https://hddt.cellphones.com.vn", nofollow: true },
        { title: "Thông tin hoá đơn mua hàng", url: "/quy-dinh-ve-hoa-don-khi-mua-hang-cellphones" },
        { title: "Trung tâm bảo hành chính hãng", url: "/bao-hanh/apple" },
        { title: "Quy định về việc sao lưu dữ liệu", url: "/quy-dinh-ve-viec-sao-luu-du-lieu" },
        { title: "Chính sách khui hộp sản phẩm Apple", url: "/chinh-sach-khui-hop-apple" },
        { title: "VAT Refund", url: "/vat-refund" },
    ];
    const socials = [
        { title: "CellphoneS Youtube Chanel", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/logo/social/cellphones-youtube.png", url: "https://www.youtube.com/@CellphoneSOfficial" },
        { title: "CellphoneS Fanpage", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/logo/social/cellphones-facebook.png", url: "https://www.facebook.com/CellphoneSVietnam" },
        { title: "CellphoneS Instagram", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/logo/social/cellphones-instagram.png", url: "https://www.instagram.com/cellphonesvn" },
        { title: "CellphoneS Tiktok", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/logo/social/cellphones-tiktok.png", url: "https://www.tiktok.com/@cellphones.official" },
        { title: "CellphoneS Zalo", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/logo/social/cellphones-zalo.png", url: "https://oa.zalo.me/3894196696036261863" },
    ];
    return (
        <div className="bg-neutral-50 border-b border-neutral-200">
            <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 p-4 xl:px-0 text-neutral-800">
                <div className="flex flex-col gap-6">
                    <section>
                        <p className="text-md mb-3 font-semibold">Tổng đài hỗ trợ miễn phí</p>
                        <ul className="flex flex-col gap-1 text-base">
                            <li>
                                <div>Mua hàng - bảo hành <a href="tel:18002044" className="font-bold hover:text-red-600">1800.2044</a> (7h30 - 22h00)</div>
                            </li>
                            <li>
                                <div>Khiếu nại <a href="tel:18002063" className="font-bold hover:text-red-600">1800.2063</a> (8h00 - 21h30)</div>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <p className="text-md mb-3 font-semibold">Phương thức thanh toán</p>
                        <ul className="flex flex-wrap items-center gap-2">
                            {payments.map((p, idx) => (
                                <li key={idx} className="h-10 md:h-8">
                                    <a href={p.url} title={p.title} target="_blank" rel="noopener noreferrer" className="inline-block">
                                        <span className="relative inline-block h-10 w-15 rounded-sm border border-neutral-100 md:h-8 md:w-12">
                                            <img alt={p.title} loading="lazy" className="object-contain h-full w-full" src={p.img} />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <div className="popup-email flex flex-col gap-2">
                        <p className="font-semibold text-neutral-800">ĐĂNG KÝ NHẬN TIN KHUYẾN MÃI</p>
                        <div className="flex flex-col p-3 rounded bg-neutral-100 py-1.5 gap-1">
                            <p className="text-red-600 font-semibold text-sm">Nhận ngay voucher 10%</p>
                            <p className="text-xs text-neutral-500">Voucher sẽ được gửi sau 24h, chỉ áp dụng cho khách hàng mới</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-medium text-sm">Email</label>
                            <div className="flex border border-neutral-300 focus-within:border-neutral-600 min-h-[40px] rounded px-3 bg-white items-center">
                                <input className="w-full bg-transparent border-none outline-none text-base placeholder:text-neutral-300" placeholder="Nhập email của bạn" required />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                            <label className="font-medium text-sm">Số điện thoại</label>
                            <div className="flex border border-neutral-300 focus-within:border-neutral-600 min-h-[40px] rounded px-3 bg-white items-center">
                                <input className="w-full bg-transparent border-none outline-none text-base placeholder:text-neutral-300" placeholder="Nhập số điện thoại của bạn" required maxLength={10} />
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-1 mt-1">
                            <a target="_blank" rel="noopener noreferrer" className="text-sm text-red-600 flex items-center gap-1 hover:underline" href="https://cellphones.com.vn/tos">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="size-4 fill-neutral-300 shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
                                </svg>
                                Tôi đồng ý với điều khoản của CellphoneS
                            </a>
                        </div>
                        <button className="mt-2 flex items-center justify-center cursor-pointer border text-base py-2 rounded-lg border-primary-500 bg-primary-500 text-white hover:border-primary-700 hover:bg-primary-700 w-full font-semibold transition-colors">
                            ĐĂNG KÝ NGAY
                        </button>
                    </div>
                </div>

                <div className="footer-col-2">
                    <p className="text-md mb-3 font-semibold">Thông tin về chính sách</p>
                    <ul className="flex flex-col gap-2.5 text-base">
                        {policies.map((item, idx) => (
                            <li key={idx}>
                                <a target="_blank" rel={item.nofollow ? "nofollow noopener" : "noopener noreferrer"} title={item.title} className="hover:underline" href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col-3">
                    <p className="text-md mb-3 font-semibold">Dịch vụ và thông tin khác</p>
                    <ul className="flex flex-col gap-2.5 text-base mb-4">
                        <li><a target="_blank" rel="noopener noreferrer" title="Khách hàng doanh nghiệp (B2B)" className="hover:underline" href="/dich-vu-khach-hang-doanh-nghiep">Khách hàng doanh nghiệp (B2B)</a></li>
                        <li><a target="_blank" rel="noopener noreferrer" title="Ưu đãi thanh toán" className="hover:underline" href="/danh-sach-khuyen-mai">Ưu đãi thanh toán</a></li>
                        <li><a target="_blank" rel="noopener noreferrer" title="Quy chế hoạt động" className="hover:underline" href="/tos">Quy chế hoạt động</a></li>
                        <li><a target="_blank" rel="noopener noreferrer" title="Chính sách bảo mật thông tin cá nhân" className="hover:underline" href="/tos?part=privacy-policy">Chính sách bảo mật thông tin cá nhân</a></li>
                        <li><a target="_blank" rel="noopener noreferrer" title="Chính sách Bảo hành" className="hover:underline" href="/chinh-sach-bao-hanh">Chính sách Bảo hành</a></li>
                        <li><a target="_blank" rel="noopener noreferrer" title="Liên hệ hợp tác kinh doanh" className="hover:underline" href="/lien-he-hop-tac">Liên hệ hợp tác kinh doanh</a></li>
                        <li><a target="_blank" rel="nofollow noopener" title="Tuyển dụng" className="hover:underline" href="https://tuyendung.cellphones.com.vn">Tuyển dụng</a></li>
                        <li><a target="_blank" rel="noopener noreferrer" title="Dịch vụ bảo hành mở rộng" className="hover:underline" href="/bieu-phi-bao-hanh-mo-rong">Dịch vụ bảo hành mở rộng</a></li>
                    </ul>

                    <div className="mt-4 border-t border-neutral-200 pt-4">
                        <span className="text-md font-bold block mb-2">Mua sắm dễ dàng – Ưu đãi ngập tràn cùng app CellphoneS</span>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <span className="relative inline-block border border-neutral-100 rounded p-1 bg-white">
                                    <img alt="QR tải app CellphoneS" loading="lazy" width="200" height="200" className="object-contain" src="https://cdn2.cellphones.com.vn/200x,webp/media/wysiwyg/Web/Logo/QR_appGeneral-v2.png" />
                                </span>
                            </div>
                            <div className="flex w-4/7 flex-col justify-between gap-2">
                                <a target="_blank" title="Tải app từ Google Play" href="https://play.google.com/store/apps/details?id=vn.com.cellphones.android.smember" rel="nofollow noopener">
                                    <img alt="Tải app từ Google Play" loading="lazy" width="200" height="67" className="object-contain" src="https://cdn2.cellphones.com.vn/200x,webp/media/wysiwyg/downloadANDROID.png" />
                                </a>
                                <a target="_blank" title="Tải app từ App Store" href="https://apps.apple.com/vn/app/smember/id6502395577?l=vi" rel="nofollow noopener">
                                    <img alt="Tải app từ App Store" loading="lazy" width="200" height="59" className="object-contain" src="https://cdn2.cellphones.com.vn/200x,webp/media/wysiwyg/downloadiOS.png" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-col-4 flex flex-col gap-6">
                    <section>
                        <p className="text-md mb-3 font-semibold">Kết nối với CellphoneS</p>
                        <ul className="flex flex-wrap items-center gap-2">
                            {socials.map((s, idx) => (
                                <li key={idx} className="h-7">
                                    <a href={s.url} title={s.title} target="_blank" rel="nofollow noopener" className="inline-block">
                                        <span className="relative inline-block h-8 w-12 rounded-sm md:h-7 md:w-10">
                                            <img alt={s.title} loading="lazy" className="object-contain h-full w-full" src={s.img} />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <p className="text-md mb-3 font-semibold">Website thành viên</p>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <p className="text-xs text-neutral-500 mb-1">Hệ thống bảo hành và chăm sóc Điện thoại - Máy tính</p>
                                <a href="https://dienthoaivui.com.vn" rel="nofollow noopener" title="Hệ thống bảo hành và chăm sóc Điện thoại - Máy tính" target="_blank" className="block h-8 w-full">
                                    <img height="30" src="https://cdn2.cellphones.com.vn/x30,webp/media/logo/corp-members/dienthoaivui.png" alt="Điện thoại Vui" className="object-contain h-full" loading="lazy" />
                                </a>
                            </li>
                            <li>
                                <p className="text-xs text-neutral-500 mb-1">Trung tâm bảo hành uỷ quyền Apple</p>
                                <a href="https://cares.vn/" rel="nofollow noopener" title="Trung tâm bảo hành uỷ quyền Apple" target="_blank" className="block h-8 w-full">
                                    <img height="30" src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/Logo_CareS_1.png" alt="CareS" className="object-contain h-full" loading="lazy" />
                                </a>
                            </li>
                            <li>
                                <p className="text-xs text-neutral-500 mb-1">Kênh thông tin giải trí công nghệ cho giới trẻ</p>
                                <a href="https://schannel.vn/" rel="nofollow noopener" title="Kênh thông tin giải trí công nghệ cho giới trẻ" target="_blank" className="block h-8 w-full">
                                    <img height="30" src="https://cdn2.cellphones.com.vn/x30,webp/media/logo/corp-members/schanel.png" alt="Schannel" className="object-contain h-full" loading="lazy" />
                                </a>
                            </li>
                            <li>
                                <p className="text-xs text-neutral-500 mb-1">Trang thông tin công nghệ mới nhất</p>
                                <a href="https://cellphones.com.vn/sforum" rel="noopener noreferrer" title="Trang thông tin công nghệ mới nhất" target="_blank" className="block h-8 w-full">
                                    <img height="30" src="https://cdn2.cellphones.com.vn/x30,webp/media/logo/corp-members/sforum.png" alt="Sforum" className="object-contain h-full" loading="lazy" />
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
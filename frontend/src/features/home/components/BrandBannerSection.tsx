
const BrandBannerSection = () => {
    return (
        <div>
            <div className="md:text-xl text-md md:leading-[2] font-bold pb-2">CHUYÊN TRANG THƯƠNG HIỆU</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <span className="inline-block w-full rounded-lg border border-neutral-100/40 overflow-hidden">
                    <img className="w-full" loading="lazy" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/apple-chinh-hang-home.jpg" width={690} height={300}/>
                </span>
                <span className="inline-block w-full rounded-lg border border-neutral-100/40 overflow-hidden">
                    <img className="w-full" loading="lazy" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/SIS%20asus.png" width={690} height={300}/>
                </span>
                <span className="inline-block w-full rounded-lg border border-neutral-100/40 overflow-hidden">
                    <img className="w-full" loading="lazy" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/gian-hang-samsung-home.png" width={690} height={300}/>
                </span>
                <span className="inline-block w-full rounded-lg border border-neutral-100/40 overflow-hidden">
                    <img className="w-full" loading="lazy" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/xiaomi.png" width={690} height={300}/>
                </span>
            </div>
        </div>
    )
}
export default BrandBannerSection;
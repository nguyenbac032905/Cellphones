import { Link } from "react-router-dom";
import SlidingBanner from "./SliddingBanner";

const MainBannerSlider = () => {
    return(
        <div className="flex-1 min-w-0 flex flex-col gap-4 max-w-[740px]">
            <SlidingBanner />
            <div className="sm:grid hidden grid-cols-3 gap-2">
                <Link to={"/"} className="rounded-xl overflow-hidden bg-neutral-100">
                    <img width={690} height={300} src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:50/plain/https://media-asset.cellphones.com.vn/dashboard-v1/mbannnmacpro.png"/>
                </Link>
                <Link to={"/"} className="rounded-xl overflow-hidden bg-neutral-100">
                    <img width={690} height={300} src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:50/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/a37-0726.png"/>
                </Link>
                <Link to={"/"} className="rounded-xl overflow-hidden bg-neutral-100">
                    <img width={690} height={300} src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:50/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/Artboard5.png"/>
                </Link>
            </div>
        </div>
    )
}
export default MainBannerSlider;
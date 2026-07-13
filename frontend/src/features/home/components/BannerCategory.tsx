import MainBannerSlider from "./MainBannerSlider";
import SidebarCategory from "./SidebarCategory";
import SidebarRight from "./SidebarRight";

const BannerCategory = () => {
    return (
        <div className="flex gap-2 w-full max-w-screen">
            <SidebarCategory />
            <MainBannerSlider />
            <SidebarRight />
        </div>
    )
}
export default BannerCategory;
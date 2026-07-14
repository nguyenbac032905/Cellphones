import MainBannerSlider from "./MainBannerSlider";
import SidebarCategory from "./SidebarCategory";
import SidebarRight from "./SidebarRight";
import CategoryFlyout from "./CategoryFlyout";
import { useState } from "react";
import type { CategoryTree } from "../../productCategories/types/categories.type";

const BannerCategory = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryTree | null>(null);

    return (
        <div
            className="relative flex gap-2 w-full max-w-screen"
            onMouseLeave={() => setActiveCategory(null)}
        >
            <SidebarCategory
                activeSlug={activeCategory?.slug}
                onHoverItem={setActiveCategory}
            />
            <MainBannerSlider />
            <SidebarRight />

            {activeCategory && (
                <CategoryFlyout category={activeCategory} />
            )}
        </div>
    );
};

export default BannerCategory;

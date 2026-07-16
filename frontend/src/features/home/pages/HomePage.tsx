import BannerCategory from '../components/BannerCategory';
import BannerSBusiness from '../components/BannerSBusiness';
import BrandBannerSection from '../components/BrandBannerSection';
import LaptopProductSection from '../components/LaptopProductSection';
import MobileProductSection from '../components/MobileProductSection';
import ProductTabSection from '../components/ProductsTabSection';
import PromoSection from '../components/PromoSection';
import SpecialPromoBanner from '../components/SpecialPromoBanner';
const HomePage = () => {
    return(
        <div className="flex flex-col gap-10 mt-2 xl:px-1 px-2 mb-10">
            <BannerCategory />
            <SpecialPromoBanner />
            <ProductTabSection />
            <MobileProductSection />
            <LaptopProductSection />
            <PromoSection />
            <BrandBannerSection />
            <BannerSBusiness />
        </div>
    )
}
export default HomePage;
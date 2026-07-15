import BannerCategory from '../components/BannerCategory';
import ProductTabSection from '../components/ProductsTabSection';
import SpecialPromoBanner from '../components/SpecialPromoBanner';
const HomePage = () => {
    return(
        <div className="flex flex-col gap-6 my-2 xl:px-1 px-2">
            <BannerCategory />
            <SpecialPromoBanner />
            <ProductTabSection />
        </div>
    )
}
export default HomePage;
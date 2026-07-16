import { Link } from "react-router-dom";

const BannerSBusiness = () => {
    return (
        <Link to={"/"} className="block w-full">
            <span className="hidden md:inline-block w-full">
                <img className="w-full" width={359} height={291} src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/Web/b2b/Desk-S-Business.png" />
            </span>
            <span className="inline-block md:hidden w-full">
                <img className="w-full" width={359} height={291} src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/Web/b2b/MB-S-Business.png" />
            </span>
        </Link>
    )
}
export default BannerSBusiness;
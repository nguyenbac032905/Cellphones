const promoBanner = {
    href: '/chao-nam-hoc-moi',
    altText: 'Back to School - Đặc quyền ưu đãi học sinh, sinh viên mùa tựu trường',
    desktopSrc: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:1200:75/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/Special-banner-1-D2---2.gif',
    mobileSrc: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:800:150/q:100/plain/https://media-asset.cellphones.com.vn/dashboard-v1/manage-banner/SpecialBanner_Mobile_dday2.gif',
}
const SpecialPromoBanner = () => {
    return (
        <a href={promoBanner.href} className="block leading-none w-full overflow-hidden select-none" >
            <span className="relative block w-full rounded-lg shadow-md md:hidden aspect-[800/150]">
                <img
                    alt={promoBanner.altText}
                    loading="lazy"
                    width={800}
                    height={150}
                    decoding="async"
                    src={promoBanner.mobileSrc}
                    className="transition-opacity duration-500 opacity-100 object-contain block w-full rounded-lg shadow-md"
                    style={{ color: 'transparent' }}
                />
            </span>
            <span className="relative hidden w-full rounded-lg shadow-md md:block aspect-[1200/75]">
                <img
                    alt={promoBanner.altText}
                    loading="lazy"
                    width={1200}
                    height={75}
                    decoding="async"
                    src={promoBanner.desktopSrc}
                    className="transition-opacity duration-500 opacity-100 object-contain w-full rounded-lg shadow-md"
                    style={{ color: 'transparent' }}
                />
            </span>
        </a>
    );
}
export default SpecialPromoBanner;
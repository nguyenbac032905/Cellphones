import { useState } from "react";
import { FireIcon, SearchIcon } from "../../shared/components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../features/products/hooks/useProducts";
import type { ProductClientQuery } from "../../features/products/types/products.type";
interface ISearch {
    setIsOpenCategory: (state: boolean) => void;
    isOpenSearch: boolean;
    setIsOpenSearch: (state: boolean) => void;
}
const BoxSearch = ({ setIsOpenCategory, isOpenSearch, setIsOpenSearch }: ISearch) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const query: ProductClientQuery = keyword.trim() === "" ? { featured: "true", limit: "12" } : { search: keyword };
    const {products} = useProducts(query);
    const handleSearch = (e: any) => {
        e.preventDefault();
        const trimmedKeyword = keyword.trim();
        if (!trimmedKeyword) return;
        setIsOpenSearch(false);
        navigate( `/products?keyword=${encodeURIComponent(trimmedKeyword)}` );
    }
    return (
        <div className="flex-1 relative">
            <form onSubmit={handleSearch}>
                <div className="z-10 w-full overflow-hidden rounded-lg text-neutral-600 flex items-center gap-2 px-3 bg-white h-[40px] border border-neutral-300 focus-within:border-none focus-within:ring-2 focus-within:ring-primary-500">
                    <div className="flex items-center justify-center">
                        <SearchIcon />
                    </div>
                    <input 
                        onChange={(e) => { setKeyword(e.target.value) }}
                        onFocus={() => { 
                            setIsOpenSearch(true); 
                            setIsOpenCategory(false) 
                        }} 
                        className="w-full bg-transparent text-sm placeholder-neutral-400 text-black" 
                        placeholder="Bạn muốn mua gì hôm nay?" 
                    />
                </div>
            </form>
            {isOpenSearch && (
                <>
                    <div
                        className="fixed inset-x-0 top-[98px] bottom-0 z-40 bg-black/30 backdrop-blur-[2px]"
                        onClick={() => setIsOpenSearch(false)}
                    />
                    <div className="absolute left-0 top-[calc(100%+20px)] z-50 w-full min-h-[400px] rounded-lg bg-white shadow-sm">
                        <div className="absolute -top-[10px] left-1/5 -translate-x-1/2 h-0 w-0 border-x-[10px] border-x-transparent border-b-[10px] border-b-white" />
                        <div className="max-h-[400px] overflow-y-auto p-4">
                            {keyword.trim() === "" ? (
                                <>
                                    <div className="flex gap-2 items-center">
                                        <FireIcon className="size-5" />
                                        <p className="text-neutral-700 font-semibold text-sm">Xu hướng tìm kiếm</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        {products.map(item => (
                                            <Link
                                                onClick={() => {
                                                    setIsOpenSearch(false);
                                                }}
                                                key={item.slug}
                                                to={`/detail/${item.slug}`}
                                                className="h-12 flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-1 transition-all duration-200 hover:border-primary-500 hover:shadow-sm "
                                            >
                                                <img
                                                    src={item.mainImage}
                                                    alt={item.title}
                                                    className="h-10 w-10 object-contain shrink-0"
                                                />

                                                <span className="line-clamp-2 text-sm text-neutral-700">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <div className="flex gap-2 items-center text-primary-500">
                                        <SearchIcon />
                                        <p className="text-neutral-700 font-semibold text-sm">Kết quả tìm kiếm</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        {products.map(item => (
                                            <Link
                                                onClick={() => {
                                                    setIsOpenSearch(false);
                                                }}
                                                key={item.slug}
                                                to={`/detail/${item.slug}`}
                                                className="h-12 flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-1 transition-all duration-200 hover:border-primary-500 hover:shadow-sm "
                                            >
                                                <img
                                                    src={item.mainImage}
                                                    alt={item.title}
                                                    className="h-10 w-10 object-contain shrink-0"
                                                />

                                                <span className="line-clamp-2 text-sm text-neutral-700">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default BoxSearch;
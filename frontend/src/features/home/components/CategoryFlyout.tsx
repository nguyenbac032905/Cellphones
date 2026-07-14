import { Link } from "react-router-dom";
import type { CategoryTree } from "../../productCategories/types/categories.type";
import { useProductsByCategory } from "../../products/hooks/useProductsByCategory";
import { titleCase } from "../../../shared/utils/titleCase";

interface CategoryFlyoutProps {
    category: CategoryTree;
}

const filterPrice = [
    {
        path: "price[lte]=5",
        title: "Dưới 5 triệu",
    },
    {
        path: "price[gte]=5&price[lte]=10",
        title: "Từ 5 - 10 triệu",
    },
    {
        path: "price[gte]=10&price[lte]=15",
        title: "Từ 10 - 15 triệu",
    },
    {
        path: "price[gte]=15&price[lte]=20",
        title: "Từ 15 - 20 triệu",
    },
    {
        path: "price[gte]=20&price[lte]=30",
        title: "Từ 20 - 30 triệu",
    },
    {
        path: "price[gte]=30",
        title: "Trên 30 triệu",
    },
];

const CategoryFlyout = ({ category }: CategoryFlyoutProps) => {
    const { products } = useProductsByCategory(category.slug);
    const featuredProducts = products .filter((item) => item.featured) .slice(0, 8);
    return (
        <div className=" absolute top-0 left-[calc(14rem+0.5rem)] z-30 hidden h-full w-[calc(100%-14rem-0.5rem)] rounded-xl bg-white shadow-50 lg:block " >
            <div className="grid h-full grid-cols-12 gap-4 p-4 overflow-y-auto">

                <div className="col-span-4">
                    <h3 className="mb-2 text-sm font-semibold">
                        Hãng {titleCase(category.title)}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {category.children?.map((item) => (
                            <Link
                                key={item._id}
                                to={`/${item.slug}`}
                                className=" flex h-12 w-[94px] items-center justify-center rounded-lg border border-neutral-200 bg-white transition-all duration-200 hover:border-primary-500 hover:shadow-sm "
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="max-h-8 max-w-[80px] object-contain"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="col-span-5">
                    <h3 className="mb-2 text-sm font-semibold">
                        {category.title} nổi bật
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {featuredProducts.map((item) => (
                            <Link
                                key={item.slug}
                                to={`/products/${item.slug}`}
                                className="h-12 flex w-[160px] items-center gap-2 rounded-lg border border-neutral-200 bg-white p-1 transition-all duration-200 hover:border-primary-500 hover:shadow-sm "
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

                <div className="col-span-3">
                    <h3 className="mb-2 text-sm font-semibold">
                        Phân khúc giá
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {filterPrice.map((item) => (
                            <Link
                                key={item.path}
                                to={`/${category.slug}?${item.path}`}
                                className="rounded-md border border-neutral-200 p-2 text-xs text-neutral-700 transition-all duration-200 hover:border-primary-500 hover:text-primary-500 "
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryFlyout;
import { Link } from "react-router-dom";
import { useGetAllChildCategory } from "../hooks/useGetAllChildCategory";

const ListCategory = ({ categorySlug }: { categorySlug: string }) => {
    const { categories, loading, error } = useGetAllChildCategory(categorySlug);
    return (
        <>
            {categories.length > 0 && (
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-neutral-900 sm:text-xl">
                        Thương hiệu
                    </h2>
                    <div className="flex gap-3 md:flex-wrap md:overflow-visible overflow-x-auto">
                        {categories.map((item) => (
                            <Link
                                key={item._id}
                                to={`/${item.slug}`}
                                className="
                                    flex h-12 w-[120px] items-center justify-center
                                    rounded-xl border border-neutral-200 bg-white p-2
                                    transition-all duration-200
                                    hover:-translate-y-0.5
                                    hover:border-primary-500
                                    hover:shadow-md
                                "
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="max-h-9 max-w-[90px] object-contain"
                                />
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}
export default ListCategory;
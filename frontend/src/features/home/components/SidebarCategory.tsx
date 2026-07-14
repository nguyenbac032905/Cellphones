import { ChevronRightIcon } from "../../../shared/components/Icons";
import { useCategoriesTree } from "../../productCategories/hooks/useCategoriesTree";
import { Link } from "react-router-dom";
import type { CategoryTree } from "../../productCategories/types/categories.type";

interface SidebarCategoryProps {
    activeSlug?: string;
    onHoverItem?: (item: CategoryTree) => void;
}

const SidebarCategory = ({ activeSlug, onHoverItem }: SidebarCategoryProps) => {
    const {categoriesTree} = useCategoriesTree();

    return (
        <div className="w-56 bg-white py-2 rounded-xl text-neutral-800 shadow-50 shrink-0 hidden lg:block">
            {categoriesTree.map(item => (
                <Link
                    key={item._id}
                    to={`/${item.slug}`}
                    onMouseEnter={() => onHoverItem?.(item)}
                    className={`flex items-center cursor-pointer h-10 px-3 hover:bg-neutral-100 ${
                        activeSlug === item.slug ? "bg-neutral-100" : ""
                    }`}
                >
                    <img src={item.thumbnail} width={28} height={28} className="mr-2"/>
                    <span className="hover:text-primary-500 mr-1 text-xs font-semibold">{item.title}</span>
                    <ChevronRightIcon className="ml-auto size-5 text-neutral-400"/>
                </Link>
            ))}
        </div>
    );
};

export default SidebarCategory;

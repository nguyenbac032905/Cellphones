import mongoose from "mongoose";

type Category = {
    _id: mongoose.Types.ObjectId;
    parent_id?: mongoose.Types.ObjectId | null;
    [key: string]: any;
};

type CategoryTree = Category & {
    children: CategoryTree[];
};

export const createTree = ( categories: Category[], parentId: string | null = null ): CategoryTree[] => {
    const tree: CategoryTree[] = [];

    for (const category of categories) {
        const categoryParentId = category.parent_id
            ? String(category.parent_id)
            : null;

        if (categoryParentId === parentId) {
            tree.push({
                ...category,
                children: createTree(
                    categories,
                    String(category._id)
                )
            });
        }
    }

    return tree;
};

export const findChildCategoryIds = (categories: Category[], parentId: string): mongoose.Types.ObjectId[] => {
    const result = [new mongoose.Types.ObjectId(parentId)];

    const children = categories.filter(
        item =>item.parent_id?.toString() === parentId
    );

    for (const child of children) {
        result.push(
            ...findChildCategoryIds(
                categories,
                child._id.toString()
            )
        );
    }

    return result;
};

export const findParentCategory = ( categories: Category[], categoryId: string ): Category[] => {
    const result: Category[] = [];

    const category = categories.find(
        item => item._id.toString() === categoryId
    );

    if (!category || !category.parent_id) {
        return result;
    }

    const parent = categories.find(
        item => item._id.equals(category.parent_id!)
    );

    if (!parent) {
        return result;
    }

    result.push(parent);

    result.push(
        ...findParentCategory(
            categories,
            parent._id.toString()
        )
    );

    return result;
};

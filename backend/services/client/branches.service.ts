import Branch from "../../models/branch.model";

export const getBranchesService = async () => {
    const branches = await Branch.find({ deleted: false })
        .sort({ createdAt: 1, _id: 1 })
        .select("_id name address phone")
        .lean();

    return {
        data: branches
    };
};

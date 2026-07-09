import User from "../../models/user.model";

type Query = {
    status?: string;
    accountType?: string;
    search?: string;
    page?: string;
    limit?: string;
};

export const getUsersService = async (query: Query = {}) => {
    const { status, accountType, search, page = 1, limit = 4} = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Filter
    const match: any = {
        deleted: false
    };

    if (status) {
        match.status = status;
    }

    if (accountType) {
        match.accountType = accountType;
    }

    const pipeline: any[] = [];

    // Search
    if (search) {
        pipeline.push({
            $search: {
                index: "default",
                text: {
                    query: search,
                    path: ["fullName", "email"]
                }
            }
        });
    }

    pipeline.push({
        $match: match
    });

    pipeline.push({
        $facet: {
            users: [
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limitNum },
                {
                    $lookup: {
                        from: "roles",
                        localField: "roleID",
                        foreignField: "_id",
                        as: "role"
                    }
                },
                {
                    $unwind: {
                        path: "$role",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        fullName: 1,
                        email: 1,
                        avatar: 1,
                        accountType: 1,
                        status: 1,
                        roleID: {
                            _id: "$role._id",
                            title: "$role.title"
                        }
                    }
                }
            ],
            total: [
                {
                    $count: "count"
                }
            ]
        }
    });

    const result = await User.aggregate(pipeline).allowDiskUse(true);

    const users = result[0].users;
    const total = result[0].total[0]?.count || 0;

    return {
        data: users,
        meta: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum)
        }
    };
};
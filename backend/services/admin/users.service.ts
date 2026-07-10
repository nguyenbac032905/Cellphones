import User from "../../models/user.model";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";
import { GetUsersServiceInput, UpdateUserBody } from "../../validations/admin/users.validation";
import Role from "../../models/role.model";

export const getUsersService = async (query: GetUsersServiceInput) => {
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
                autocomplete: {
                    query: search,
                    path: "fullName"
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
export const createUserService = async ( fullName: string, email: string, password: string, roleID: string ) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("Email already exists!", 400);
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        fullName,
        email,
        accountType: "admin",
        roleID,
        password: hashedPassword
    });
    await newUser.save();

    return {
        message: "Created User successfully",
    };
};
export const getUserService = async (userID: string) => {
    const user = await User.findOne({_id: userID, deleted: false}).populate("roleID", "title").select("-__v -password -refreshToken -refreshTokenExpiredAt").lean();
    if(!user){
        throw new AppError("User not found", 404);
    }
    return {
        data: user
    }
};
export const updateUserService = async ( userID: string, body: UpdateUserBody ) => {
    if (body.email) {
        const existEmail = await User.findOne({
            email: body.email,
            _id: { $ne: userID },
        });
        if (existEmail) {
            throw new AppError("Email already exists", 409);
        }
    }
    if (body.password) {
        body.password = await bcrypt.hash(body.password, 10);
    }

    const result = await User.updateOne(
        { _id: userID },
        { $set: body }
    );
    if (result.matchedCount === 0) {
        throw new AppError("User not found", 404);
    }

    return {
        message: "Updated user successfully",
    };
};
export const deleteUserService = async  (userID: string) => {
    const result = await User.updateOne( { _id: userID }, { $set: {deleted: true} } );
    
    if (result.matchedCount === 0) {
        throw new AppError("User not found", 404);
    }
    return {
        message: "Deleted user successfully"
    }
}
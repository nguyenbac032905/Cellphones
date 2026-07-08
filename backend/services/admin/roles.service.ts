import Role from "../../models/role.model"
import { AppError } from "../../utils/AppError";
import { CreateRoleBody, UpdateRoleBody } from "../../validations/admin/role.validation";

export const getRolesService = async () => {
    const roles = await Role.find({deleted: false});
    return { data: roles };
};
export const getRoleService = async (roleID: string) => {
    const role = await Role.findOne({_id: roleID,deleted: false});
    return {data: role};
}
export const createRoleService = async (body: CreateRoleBody) => {
    const existedRole = await Role.findOne({ title: body.title });
    if (existedRole) {
        throw new AppError("Role title already exists", 409);
    }

    await Role.create({
        title: body.title,
        description: body.description,
        permissions: body.permissions
    });

    return {
        message: "Role created successfully"
    }
};
export const updateRoleService = async ( roleID: string, body: UpdateRoleBody ) => {
    if (body.title) {
        const existedRole = await Role.findOne({ title: body.title, _id: { $ne: roleID }, });

        if (existedRole) {
            throw new AppError("Role title already exists", 409);
        }
    }

    const result = await Role.updateOne( { _id: roleID }, { $set: body } );

    if (result.matchedCount === 0) {
        throw new AppError("Role not found", 404);
    }

    return {
        message: "Role updated successfully",
    };
};
export const deleteRoleService = async ( roleID: string ) => {
    const result = await Role.updateOne( { _id: roleID }, { $set: {deleted: true} } );

    if (result.matchedCount === 0) {
        throw new AppError("Role not found", 404);
    }

    return {
        message: "Role deleted successfully",
    };
};
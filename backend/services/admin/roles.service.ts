import Role from "../../models/role.model"
import { AppError } from "../../utils/AppError";
import { CreateRoleBody } from "../../validations/admin/role.validation";

export const getRolesService = async () => {
    const roles = await Role.find({deleted: false});
    return { data: roles };
};
export const createRoleService = async (body: CreateRoleBody) => {
    const role = await Role.create({
        title: body.title,
        description: body.description,
        permissions: body.permissions
    });
    if(!role){
        throw new AppError("Role title already exists", 500);
    }
    return {
        message: "Role created successfully"
    }
};
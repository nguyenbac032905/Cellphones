import Role from "../../models/role.model"

export const getRolesService = async () => {
    const roles = await Role.find({deleted: false});
    return { data: roles };
}
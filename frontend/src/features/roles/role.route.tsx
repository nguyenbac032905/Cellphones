import PermissionRoute from "../auth/components/PermissionRoute";
import { PERMISSIONS } from "./constants/role.const";
import CreateRolePage from "./pages/CreateRolePage";
import RoleDetailPage from "./pages/RoleDetailPage";
import RolesPage from "./pages/RolesPage";
import UpdateRolePage from "./pages/UpdateRolePage";

export const adminRoleRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.ROLES.READ}/>,
        children: [
            {
                path: "roles",
                element: <RolesPage />
            },
            {
                path: "roles/details/:roleID",
                element: <RoleDetailPage />
            },
        ]
    },
    {
        element: <PermissionRoute permission={PERMISSIONS.ROLES.CREATE}/>,
        children: [
            {
                path: "roles/create",
                element: <CreateRolePage />
            }
        ]
    },
    {
        element: <PermissionRoute permission={PERMISSIONS.ROLES.UPDATE}/>,
        children: [
            {
                path: "roles/edit/:roleID",
                element: <UpdateRolePage />
            }
        ]
    }
];
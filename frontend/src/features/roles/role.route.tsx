import CreateRolePage from "./pages/CreateRolePage";
import RoleDetailPage from "./pages/RoleDetailPage";
import RolesPage from "./pages/RolesPage";
import UpdateRolePage from "./pages/UpdateRolePage";

export const adminRoleRoutes = [
    {
        path: "roles",
        element: <RolesPage />
    },
    {
        path: "roles/create",
        element: <CreateRolePage />
    },
    {
        path: "roles/details/:roleID",
        element: <RoleDetailPage />
    },
    {
        path: "roles/edit/:roleID",
        element: <UpdateRolePage />
    }
];
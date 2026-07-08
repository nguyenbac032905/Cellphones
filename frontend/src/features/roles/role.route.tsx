import CreateRolePage from "./pages/CreateRolePage";
import RolesPage from "./pages/RolesPage";

export const adminRoleRoutes = [
    {
        path: "roles",
        element: <RolesPage />
    },
    {
        path: "roles/create",
        element: <CreateRolePage />
    }
];
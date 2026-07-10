import CreateUserPage from "./pages/CreateUserPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import UserDetailAdminPage from "./pages/UserDetailAdminPage";
import UserAdminPage from "./pages/UsersAdminPage";
import PermissionRoute from "../auth/components/PermissionRoute";
import { PERMISSIONS } from "../roles/constants/role.const";

export const usersAdminRoutes = [
    {
        elemen: <PermissionRoute permission={PERMISSIONS.USERS.READ} />,
        children: [
            {
                path: "users",
                element: <UserAdminPage />
            },
            {
                path: "users/details/:userID",
                element: <UserDetailAdminPage />
            },
        ]
    },
    {
        elemen: <PermissionRoute permission={PERMISSIONS.USERS.CREATE} />,
        children: [
            {
                path: "users/create",
                element: <CreateUserPage />
            }
        ]
    },
    {
        elemen: <PermissionRoute permission={PERMISSIONS.USERS.UPDATE} />,
        children: [
            {
                path: "users/edit/:userID",
                element: <UpdateUserPage />
            }
        ]
    }
]
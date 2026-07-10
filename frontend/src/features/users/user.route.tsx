import CreateUserPage from "./pages/CreateUserPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import UserDetailAdminPage from "./pages/UserDetailAdminPage";
import UserAdminPage from "./pages/UsersAdminPage";

export const usersAdminRoutes = [
    {
        path: "users",
        element: <UserAdminPage />
    },
    {
        path: "users/create",
        element: <CreateUserPage />
    },
    {
        path: "users/details/:userID",
        element: <UserDetailAdminPage />
    },
    {
        path: "users/edit/:userID",
        element: <UpdateUserPage />
    }
]
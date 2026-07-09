import CreateUserPage from "./pages/CreateUserPage";
import UserAdminPage from "./pages/UsersAdminPage";

export const usersAdminRoutes = [
    {
        path: "users",
        element: <UserAdminPage />
    },
    {
        path: "users/create",
        element: <CreateUserPage />
    }
]
import AdminLoginPage from "./pages/AdminLoginPage";
import LoginPage from "./pages/LoginPage";
import OtpVerifyPage from "./pages/OtpVerifyPage";
import RegisterPage from "./pages/RegisterPage";
import SetPasswordPage from "./pages/SetPasswordPage";

export const adminAuthRoutes = [
    {
        path: "login",
        element: <AdminLoginPage />
    }
];
export const authRoutes = [
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "register",
        element: <RegisterPage />
    },
    {
        path: "verify-otp",
        element: <OtpVerifyPage />
    },
    {
        path: "set-password",
        element: <SetPasswordPage />
    }
];
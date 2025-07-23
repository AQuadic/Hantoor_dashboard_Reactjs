import CahngePassword from "@/components/forgetpassword/ChangePassword";
import VerficationCode from "@/components/forgetpassword/VerficationCode";
import ForgetPassword from "@/pages/ForgetPassword";
import LoginPage from "@/pages/LoginPage";
import { RouteTypes } from "@/types/general/RouteTypes";

export const publicRoutes: RouteTypes[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
    {
    path: "/verification-code",
    element: <VerficationCode />,
  },
    {
    path: "/change-password",
    element: <CahngePassword />,
  },
];

import LoginPage from "@/pages/LoginPage";
import { RouteTypes } from "@/types/general/RouteTypes";

export const publicRoutes: RouteTypes[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

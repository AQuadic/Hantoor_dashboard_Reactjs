import DashboardPage from "@/pages/DashboardPage";
import { RouteTypes } from "@/types/general/RouteTypes";

export const privateRoutes: RouteTypes[] = [
  {
    path: "/",
    element: <DashboardPage />,
  },
];

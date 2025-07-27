import AddUsers from "@/components/users/AddUsers";
import DashboardPage from "@/pages/DashboardPage";
import DashboardUsers from "@/pages/DashboardUsers";
import Testing from "@/pages/Testing";
import { RouteTypes } from "@/types/general/RouteTypes";

export const privateRoutes: RouteTypes[] = [
  {
    path: "/testing",
    element: <Testing />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard/users",
    element: <DashboardUsers />,
  },
    {
    path: "/dashboard/addUsers",
    element: <AddUsers />,
  },
];

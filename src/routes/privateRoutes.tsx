import AddUsers from "@/components/users/AddUsers";
import BrandsPage from "@/pages/BrandsPage";
import DashboardPage from "@/pages/DashboardPage";
import DashboardUsers from "@/pages/DashboardUsers";
import ProfilePage from "@/pages/ProfilePage";
import Testing from "@/pages/Testing";
import { RouteTypes } from "@/types/general/RouteTypes";

export const privateRoutes: RouteTypes[] = [
  {
    path: "/testing",
    element: <Testing />,
  },
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/users",
    element: <DashboardUsers />,
  },
  {
    path: "/addUsers",
    element: <AddUsers />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/brands",
    element: <BrandsPage />,
  },
];

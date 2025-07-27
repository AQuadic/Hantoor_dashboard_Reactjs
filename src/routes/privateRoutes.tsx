import AddUsers from "@/components/users/AddUsers";
import ChangePassword from "@/components/users/ChangePassword";
import EditUsers from "@/components/users/EditUsers";
import AddBrand from "@/pages/brands/AddBrand";
import BrandsPage from "@/pages/brands/BrandsPage";
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
  // Users routes - flattened
  {
    path: "/users",
    element: <DashboardUsers />,
  },
  {
    path: "/users/add",
    element: <AddUsers />,
  },
  {
    path: "/users/edit",
    element: <EditUsers />,
  },
  {
    path: "/users/change-password",
    element: <ChangePassword />,
  },
  // Brands routes - flattened
  {
    path: "/brands",
    element: <BrandsPage />,
  },
  {
    path: "/brands/add",
    element: <AddBrand />,
  },
  {
    path: "/brands/:id",
    element: <AddBrand />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];

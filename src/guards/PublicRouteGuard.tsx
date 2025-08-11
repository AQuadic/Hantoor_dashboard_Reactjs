import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
  const token = Cookies.get("hantoor_token");
  const isAuthenticated = !!token;
  return { isAuthenticated };
};

const PublicRouteGuard = () => {
  const { isAuthenticated } = useAuth();

  // redirect them to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, allow access to public routes
  return <Outlet />;
};

export default PublicRouteGuard;

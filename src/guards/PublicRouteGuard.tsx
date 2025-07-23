import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("authToken");
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

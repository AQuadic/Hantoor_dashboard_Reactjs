import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("authToken");
  const isAuthenticated = !!token;

  return { isAuthenticated };
};

const PrivateRouteGuard = () => {
  const { isAuthenticated } = useAuth();

  // If user is not authenticated, redirect to login
  if (isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default PrivateRouteGuard;

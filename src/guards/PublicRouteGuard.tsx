import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import { useLayoutEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useLayoutEffect(() => {
    const token = Cookies.get("hantoor_token");
    setIsAuthenticated(!!token);
  }, []);
  return { isAuthenticated };
};

const PublicRouteGuard = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // Optionally render a loading spinner here
    return null;
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRouteGuard;

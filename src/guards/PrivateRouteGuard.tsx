import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRouteGuard = () => {
  // Synchronously check for token in sessionStorage first, then cookie.
  let token: string | undefined | null = undefined;
  try {
    token = sessionStorage.getItem("hantoor_token") || undefined;
  } catch {
    // ignore
  }
  if (!token) {
    token = Cookies.get("hantoor_token");
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRouteGuard;

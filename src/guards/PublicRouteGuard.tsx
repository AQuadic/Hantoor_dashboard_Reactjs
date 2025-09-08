import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRouteGuard = () => {
  let token: string | undefined | null = undefined;
  try {
    token = sessionStorage.getItem("hantoor_token") || undefined;
  } catch {
    // ignore
  }
  if (!token) {
    token = Cookies.get("hantoor_token");
  }

  if (token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRouteGuard;

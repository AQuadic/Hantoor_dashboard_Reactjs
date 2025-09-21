import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";

interface PermissionRouteGuardProps {
  requiredPermissions?: string[];
  requireAny?: boolean; // Default: true (user needs ANY of the permissions), false = user needs ALL permissions
  children?: React.ReactNode;
}

/**
 * Permission-based route guard component
 * Protects routes based on user permissions
 * Redirects to 403 (Forbidden) page if user lacks required permissions
 */
const PermissionRouteGuard: React.FC<PermissionRouteGuardProps> = ({
  requiredPermissions,
  requireAny = true,
  children,
}) => {
  const { permissions, isLoading } = usePermissions();
  const location = useLocation();

  // Show loading state while permissions are being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If no permissions are required, allow access
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return children ? <>{children}</> : <Outlet />;
  }

  // Get permission keys for checking
  const permissionKeys = permissions.map((p) => p.key);

  // Check if user has required permissions
  const hasAccess = requireAny
    ? requiredPermissions.some((permission) =>
        permissionKeys.includes(permission)
      )
    : requiredPermissions.every((permission) =>
        permissionKeys.includes(permission)
      );

  if (!hasAccess) {
    // Redirect to 403 page with state containing the attempted location
    return (
      <Navigate
        to="/403"
        state={{ from: location, requiredPermissions }}
        replace
      />
    );
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PermissionRouteGuard;

import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import { useAuthStore } from "@/store/useAuthStore";

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
  const { permissions, isLoading, isLoaded, error } = usePermissions();
  const { isAuthenticated, loading: authLoading } = useAuthStore();
  const location = useLocation();
  const [isInitializing, setIsInitializing] = useState(true);

  // Allow a brief initialization period to prevent flash redirects
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 100); // Small delay to allow auth state to settle

    return () => clearTimeout(timer);
  }, []);

  // Wait for initial setup and auth to finish loading
  if (isInitializing || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is not authenticated, let PrivateRouteGuard handle the redirect
  if (!isAuthenticated) {
    console.log("🛡️ User not authenticated, passing through...");
    return children ? <>{children}</> : <Outlet />;
  }

  // For authenticated users, wait for permissions to be loaded
  // Only proceed once we have either loaded permissions or confirmed there are none
  if (isLoading || (!isLoaded && isAuthenticated)) {
    console.log("🛡️ Waiting for permissions to load...", {
      isLoading,
      isLoaded,
      isAuthenticated,
    });
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If there was an error loading permissions, show error state but still allow access
  // (This prevents users from being locked out due to API issues)
  if (error) {
    console.warn("🛡️ Permission loading error, allowing access:", error);
    // You might want to show a warning banner here
    return children ? <>{children}</> : <Outlet />;
  }

  // If no permissions are required, allow access
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return children ? <>{children}</> : <Outlet />;
  }

  // Get permission keys for checking
  const permissionKeys = permissions.map((p) => p.key);

  const resourceFromKey = (key: string) => key.split("_").slice(1).join("_");

  // Strict matching helper used by UI: exact key, or user key endsWith `_<resource>`,
  // or contains `_<resource>_` as a middle segment. This avoids matching
  // dashboard counter keys like `view_finances_count_dashboard`.
  const permissionMatches = (requiredPermission: string) => {
    if (permissionKeys.includes(requiredPermission)) return true;
    const resource = resourceFromKey(requiredPermission);
    if (!resource) return false;

    for (const k of permissionKeys) {
      if (k === requiredPermission) return true;
      if (k.endsWith(`_${resource}`)) return true;
      if (k.includes(`_${resource}_`)) return true;
    }

    return false;
  };

  // Check if user has required permissions using the strict matcher
  const hasAccess = requireAny
    ? requiredPermissions.some((permission) => permissionMatches(permission))
    : requiredPermissions.every((permission) => permissionMatches(permission));

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

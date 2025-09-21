import React, { ReactNode } from "react";
import {
  usePermissions,
  useHasPermission,
  useHasAnyPermission,
  useHasAllPermissions,
  useHasRole,
} from "@/hooks/usePermissions";

// Types for permission checking modes
export type PermissionMode =
  | "require"
  | "requireAny"
  | "requireAll"
  | "requireRole";

export interface ProtectedComponentProps {
  children: ReactNode;

  // Permission requirements
  permissions?: string | string[];
  roles?: string | string[];
  mode?: PermissionMode;

  // Fallback options
  fallback?: ReactNode;
  hideFallback?: boolean; // If true, shows nothing instead of fallback when access denied

  // Loading state handling
  showLoadingFallback?: boolean;
  loadingFallback?: ReactNode;

  // Additional props
  className?: string;
  style?: React.CSSProperties;

  // Debug mode
  debug?: boolean;
}

/**
 * ProtectedComponent - A flexible wrapper component that conditionally renders content based on permissions
 *
 * @example Basic usage:
 * ```tsx
 * <ProtectedComponent permissions="create_user">
 *   <button>Create User</button>
 * </ProtectedComponent>
 * ```
 *
 * @example Multiple permissions (ALL required):
 * ```tsx
 * <ProtectedComponent
 *   permissions={["create_user", "edit_user"]}
 *   mode="requireAll"
 * >
 *   <button>Manage Users</button>
 * </ProtectedComponent>
 * ```
 *
 * @example Any permission (OR logic):
 * ```tsx
 * <ProtectedComponent
 *   permissions={["view_user", "create_user", "edit_user"]}
 *   mode="requireAny"
 *   fallback={<div>Access Denied</div>}
 * >
 *   <UserManagementPanel />
 * </ProtectedComponent>
 * ```
 */
// Helper function to determine access based on mode and results
const determineAccess = (
  mode: PermissionMode,
  permissions?: string | string[],
  roles?: string | string[],
  hasPermissionResult = false,
  hasAnyPermissionResult = false,
  hasAllPermissionsResult = false,
  hasRoleResult = false
): boolean => {
  switch (mode) {
    case "require":
      return permissions ? hasPermissionResult : hasRoleResult;

    case "requireAny":
      return permissions && Array.isArray(permissions)
        ? hasAnyPermissionResult
        : hasRoleResult;

    case "requireAll":
      return permissions && Array.isArray(permissions)
        ? hasAllPermissionsResult
        : hasRoleResult;

    case "requireRole":
      return hasRoleResult;

    default:
      console.warn(`ProtectedComponent: Unknown mode "${mode}"`);
      return false;
  }
};

export const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
  children,
  permissions,
  roles,
  mode = "require",
  fallback = null,
  hideFallback = false,
  showLoadingFallback = true,
  loadingFallback = <div className="text-gray-500">Loading...</div>,
  className,
  style,
  debug = false,
}) => {
  // Get permission context - call hooks unconditionally
  const { isLoading, permissions: userPermissions } = usePermissions();

  // Call all possible hooks unconditionally to satisfy React Hook rules
  const hasPermissionResult = useHasPermission(permissions || "");
  const hasAnyPermissionResult = useHasAnyPermission(
    Array.isArray(permissions) ? permissions : []
  );
  const hasAllPermissionsResult = useHasAllPermissions(
    Array.isArray(permissions) ? permissions : []
  );
  const hasRoleResult = useHasRole(roles || "");

  // Handle loading state
  if (isLoading && showLoadingFallback) {
    return <>{loadingFallback}</>;
  }

  // Determine access
  const hasAccess = determineAccess(
    mode,
    permissions,
    roles,
    hasPermissionResult,
    hasAnyPermissionResult,
    hasAllPermissionsResult,
    hasRoleResult
  );

  // Debug logging
  if (debug) {
    console.log("🔐 ProtectedComponent Debug:", {
      mode,
      permissions,
      roles,
      hasAccess,
      userPermissionsCount: userPermissions?.length || 0,
    });
  }

  // Render logic
  if (hasAccess) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Access denied - show fallback or nothing
  return hideFallback ? null : <>{fallback}</>;
};

// Convenience wrapper components for common use cases
export const RequirePermission: React.FC<
  Omit<ProtectedComponentProps, "mode">
> = (props) => <ProtectedComponent {...props} mode="require" />;

export const RequireAnyPermission: React.FC<
  Omit<ProtectedComponentProps, "mode">
> = (props) => <ProtectedComponent {...props} mode="requireAny" />;

export const RequireAllPermissions: React.FC<
  Omit<ProtectedComponentProps, "mode">
> = (props) => <ProtectedComponent {...props} mode="requireAll" />;

export const RequireRole: React.FC<Omit<ProtectedComponentProps, "mode">> = (
  props
) => <ProtectedComponent {...props} mode="requireRole" />;

export default ProtectedComponent;

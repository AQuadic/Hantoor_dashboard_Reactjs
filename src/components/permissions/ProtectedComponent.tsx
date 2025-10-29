import React, { ReactNode } from "react";
import {
  usePermissions,
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
  hasAnyPermissionResult = false,
  hasAllPermissionsResult = false,
  hasRoleResult = false
): boolean => {
  switch (mode) {
    case "require":
      // If permissions were provided, show the page/tab when the user has ANY
      // of the relevant permissions (view/edit/add/delete/status etc.). If no
      // permissions were provided, fall back to role check.
      return permissions ? hasAnyPermissionResult : hasRoleResult;

    case "requireAny":
      return permissions ? hasAnyPermissionResult : hasRoleResult;

    case "requireAll":
      // If an array of permissions was provided, require all of them. If a
      // single permission string was provided treat it as "any variant"
      // (see generation rules) and allow access if the user has any of those
      // variants.
      return Array.isArray(permissions)
        ? hasAllPermissionsResult
        : hasAnyPermissionResult || hasRoleResult;

    case "requireRole":
      return hasRoleResult;

    default:
      console.warn(`ProtectedComponent: Unknown mode "${mode}"`);
      return false;
  }
};

// Generate a set of permission variants for a resource-like permission string.
// If the incoming permission is already a full permission (e.g. "view_models")
// we still include it, but we also add common action variants so that having
// any of them grants access to the page/tab.
const generatePermissionVariants = (perm: string): string[] => {
  const actions = [
    "view",
    "create",
    "add",
    "edit",
    "update",
    "delete",
    "status",
  ];
  // If permission already contains an action prefix, strip it to get the base
  // resource (e.g. view_models -> models), but still include the original.
  const maybeBase = perm.includes("_") ? perm.replace(/^[^_]+_/, "") : perm;
  const variants = actions.map((a) => `${a}_${maybeBase}`);
  return Array.from(new Set([perm, ...variants]));
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

  // Build permission list: if a string is provided we expand it to common
  // action variants so that having any related permission grants view access.
  let permissionList: string[] = [];
  if (Array.isArray(permissions)) {
    permissionList = permissions;
  } else if (typeof permissions === "string") {
    permissionList = generatePermissionVariants(permissions);
  }

  // Call all possible hooks unconditionally to satisfy React Hook rules
  const hasAnyPermissionResult = useHasAnyPermission(permissionList);
  const hasAllPermissionsResult = useHasAllPermissions(
    Array.isArray(permissions) ? permissions : permissionList
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
    hasAnyPermissionResult,
    hasAllPermissionsResult,
    hasRoleResult
  );

  // Debug logging
  if (debug) {
    console.log("🔐 ProtectedComponent Debug:", {
      mode,
      permissions,
      derivedPermissions: permissionList,
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

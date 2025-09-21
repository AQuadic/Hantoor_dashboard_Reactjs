import { useMemo } from "react";
import {
  usePermissions,
  useHasPermission,
  useHasAnyPermission,
  useHasAllPermissions,
  useHasRole,
} from "@/hooks/usePermissions";

type PermissionInput = string | string[] | undefined;

export interface AccessConfig {
  permissions?: string | string[];
  roles?: string | string[];
  mode?: "require" | "requireAny" | "requireAll" | "requireRole";
}

export interface AccessResult {
  canAccess: boolean;
  isLoading: boolean;
  error: string | null;

  // Additional context
  permissions: {
    hasPermissions: boolean;
    hasAnyPermissions: boolean;
    hasAllPermissions: boolean;
    hasRoles: boolean;
  };

  // Convenience methods
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;

  // Helper functions
  checkPermission: (permission: string) => boolean;
  checkAnyPermission: (permissions: string[]) => boolean;
  checkAllPermissions: (permissions: string[]) => boolean;
}

/**
 * Enhanced hook for conditional rendering logic with multiple access patterns
 *
 * @param config - Access configuration with permissions, roles, and mode
 * @returns AccessResult - Comprehensive access information and helper functions
 *
 * @example Basic usage:
 * ```tsx
 * const { canAccess, isLoading } = useCanAccess({
 *   permissions: "create_user",
 *   mode: "require"
 * });
 *
 * if (isLoading) return <Loading />;
 * return canAccess ? <CreateButton /> : null;
 * ```
 *
 * @example Advanced usage with CRUD operations:
 * ```tsx
 * const { canView, canCreate, canEdit, canDelete } = useCanAccess({
 *   permissions: ["view_user", "create_user", "edit_user", "delete_user"],
 *   mode: "requireAny"
 * });
 * ```
 *
 * @example Module-based access:
 * ```tsx
 * const userAccess = useCanAccess({
 *   permissions: ["view_user", "create_user", "edit_user"],
 *   mode: "requireAny"
 * });
 *
 * const adminAccess = useCanAccess({
 *   roles: ["admin", "super_admin"],
 *   mode: "requireAny"
 * });
 * ```
 */
export const useCanAccess = (config: AccessConfig): AccessResult => {
  const { permissions, roles, mode = "require" } = config;

  // Get base permission context
  const {
    isLoading,
    error,
    hasPermission: contextHasPermission,
  } = usePermissions();

  // Helper to convert permissions to array
  const permissionsArray = useMemo(() => {
    if (Array.isArray(permissions)) return permissions;
    if (permissions) return [permissions];
    return [];
  }, [permissions]);

  // Call all hooks unconditionally
  const hasPermissionResult = useHasPermission(permissions || "");
  const hasAnyPermissionResult = useHasAnyPermission(permissionsArray);
  const hasAllPermissionsResult = useHasAllPermissions(permissionsArray);
  const hasRoleResult = useHasRole(roles || "");

  // Calculate main access result
  const canAccess = useMemo(() => {
    if (isLoading) return false;

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
        return false;
    }
  }, [
    isLoading,
    mode,
    permissions,
    hasPermissionResult,
    hasAnyPermissionResult,
    hasAllPermissionsResult,
    hasRoleResult,
  ]);

  // Helper functions to extract permission types
  const getViewPermission = (perms: PermissionInput): string => {
    if (typeof perms === "string") {
      return perms.replace(/^(create_|edit_|delete_)/, "view_");
    }
    if (Array.isArray(perms)) {
      return perms.find((p) => p.startsWith("view_")) || "";
    }
    return "";
  };

  const getCreatePermission = (perms: PermissionInput): string => {
    if (typeof perms === "string") {
      return perms.includes("create_") ? perms : "";
    }
    if (Array.isArray(perms)) {
      return perms.find((p) => p.startsWith("create_")) || "";
    }
    return "";
  };

  const getEditPermission = (perms: PermissionInput): string => {
    if (typeof perms === "string") {
      return perms.includes("edit_") ? perms : "";
    }
    if (Array.isArray(perms)) {
      return perms.find((p) => p.startsWith("edit_")) || "";
    }
    return "";
  };

  const getDeletePermission = (perms: PermissionInput): string => {
    if (typeof perms === "string") {
      return perms.includes("delete_") ? perms : "";
    }
    if (Array.isArray(perms)) {
      return perms.find((p) => p.startsWith("delete_")) || "";
    }
    return "";
  };

  // CRUD operation checks (assumes standard permission naming)
  const canView = useHasPermission(getViewPermission(permissions));
  const canCreate = useHasPermission(getCreatePermission(permissions));
  const canEdit = useHasPermission(getEditPermission(permissions));
  const canDelete = useHasPermission(getDeletePermission(permissions));

  // Helper functions using the context
  const checkPermission = useMemo(
    () => (permission: string) => {
      return contextHasPermission(permission);
    },
    [contextHasPermission]
  );

  // Note: These helper functions can't use hooks inside callbacks,
  // so they'll need to be used differently
  const checkAnyPermission = useMemo(
    () => (perms: string[]) => {
      // Return a function that can be called by components to check permissions
      return perms.some((perm) => contextHasPermission(perm));
    },
    [contextHasPermission]
  );

  const checkAllPermissions = useMemo(
    () => (perms: string[]) => {
      // Return a function that can be called by components to check permissions
      return perms.every((perm) => contextHasPermission(perm));
    },
    [contextHasPermission]
  );

  return {
    canAccess,
    isLoading,
    error,

    permissions: {
      hasPermissions: hasPermissionResult,
      hasAnyPermissions: hasAnyPermissionResult,
      hasAllPermissions: hasAllPermissionsResult,
      hasRoles: hasRoleResult,
    },

    // CRUD operations
    canView,
    canCreate,
    canEdit,
    canDelete,

    // Helper functions
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
  };
};

/**
 * Convenience hooks for common access patterns
 */
export const useCanView = (resource: string) => {
  return useCanAccess({ permissions: `view_${resource}` });
};

export const useCanCreate = (resource: string) => {
  return useCanAccess({ permissions: `create_${resource}` });
};

export const useCanEdit = (resource: string) => {
  return useCanAccess({ permissions: `edit_${resource}` });
};

export const useCanDelete = (resource: string) => {
  return useCanAccess({ permissions: `delete_${resource}` });
};

export const useCanManage = (resource: string) => {
  return useCanAccess({
    permissions: [
      `view_${resource}`,
      `create_${resource}`,
      `edit_${resource}`,
      `delete_${resource}`,
    ],
    mode: "requireAny",
  });
};

export const useCanFullyManage = (resource: string) => {
  return useCanAccess({
    permissions: [
      `create_${resource}`,
      `edit_${resource}`,
      `delete_${resource}`,
    ],
    mode: "requireAll",
  });
};

export default useCanAccess;

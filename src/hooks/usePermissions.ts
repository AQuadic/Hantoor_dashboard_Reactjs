import { useContext } from "react";
import { PermissionContext } from "@/contexts/permission-context";
import { PermissionContextType } from "@/types/PermissionTypes";

/**
 * Custom hook to access the Permission Context
 * Provides access to all permission-related state and actions
 *
 * @returns PermissionContextType - The permission context with state and actions
 * @throws Error if used outside of PermissionProvider
 *
 * @example
 * ```tsx
 * const { permissions, hasPermission, isLoading } = usePermissions();
 *
 * if (hasPermission('user.create')) {
 *   // Show create user button
 * }
 * ```
 */
export const usePermissions = (): PermissionContextType => {
  const context = useContext(PermissionContext);

  if (context === undefined) {
    throw new Error(
      "usePermissions must be used within a PermissionProvider. " +
        "Make sure your component is wrapped with <PermissionProvider>."
    );
  }

  return context;
};

/**
 * Hook to check if user has a specific permission
 * Convenience hook for quick permission checks
 *
 * @param permissionKey - Single permission key or array of permission keys to check
 * @returns boolean - True if user has the permission(s)
 *
 * @example
 * ```tsx
 * const canCreateUser = useHasPermission('user.create');
 * const canManageUsers = useHasPermission(['user.create', 'user.edit', 'user.delete']);
 * ```
 */
export const useHasPermission = (permissionKey: string | string[]): boolean => {
  const { hasPermission } = usePermissions();
  return hasPermission(permissionKey);
};

/**
 * Hook to check if user has any of the specified permissions
 *
 * @param permissionKeys - Array of permission keys to check
 * @returns boolean - True if user has at least one of the permissions
 *
 * @example
 * ```tsx
 * const canAccessUserModule = useHasAnyPermission(['user.view', 'user.create', 'user.edit']);
 * ```
 */
export const useHasAnyPermission = (permissionKeys: string[]): boolean => {
  const { hasAnyPermission } = usePermissions();
  return hasAnyPermission(permissionKeys);
};

/**
 * Hook to check if user has all of the specified permissions
 *
 * @param permissionKeys - Array of permission keys to check
 * @returns boolean - True if user has all of the permissions
 *
 * @example
 * ```tsx
 * const canFullyManageUsers = useHasAllPermissions(['user.create', 'user.edit', 'user.delete']);
 * ```
 */
export const useHasAllPermissions = (permissionKeys: string[]): boolean => {
  const { hasAllPermissions } = usePermissions();
  return hasAllPermissions(permissionKeys);
};

/**
 * Hook to check if user has a specific role
 *
 * @param roleKey - Single role key or array of role keys to check
 * @returns boolean - True if user has the role(s)
 *
 * @example
 * ```tsx
 * const isAdmin = useHasRole('admin');
 * const isSuperUserOrAdmin = useHasRole(['super_user', 'admin']);
 * ```
 */
export const useHasRole = (roleKey: string | string[]): boolean => {
  const { hasRole } = usePermissions();
  return hasRole(roleKey);
};

/**
 * Hook to get current permission loading state
 * Useful for showing loading indicators
 *
 * @returns boolean - True if permissions are currently being fetched
 */
export const usePermissionsLoading = (): boolean => {
  const { isLoading } = usePermissions();
  return isLoading;
};

/**
 * Hook to get permission error state
 * Useful for error handling and display
 *
 * @returns string | null - Error message if any, null otherwise
 */
export const usePermissionsError = (): string | null => {
  const { error } = usePermissions();
  return error;
};

/**
 * Hook to get permission actions
 * Provides access to permission management actions
 *
 * @returns Object with permission management functions
 */
export const usePermissionActions = () => {
  const { fetchPermissions, refreshPermissions, clearPermissions } =
    usePermissions();

  return {
    fetchPermissions,
    refreshPermissions,
    clearPermissions,
  };
};

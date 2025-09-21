// Permission Management System Exports
// This file provides convenient imports for the permission management system

// Core Context and Provider
export { PermissionContext } from "../contexts/permission-context";
export { PermissionProvider } from "../contexts/PermissionContext";

// Custom Hooks
export {
  usePermissions,
  useHasPermission,
  useHasAnyPermission,
  useHasAllPermissions,
  useHasRole,
  usePermissionsLoading,
  usePermissionsError,
  usePermissionActions,
} from "../hooks/usePermissions";

// Utility Functions
export {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasRole,
  checkPermissions,
  getPermissionsByModule,
  hasModuleAccess,
  getUserModules,
} from "../utils/permissionUtils";

// API Functions
export {
  getCurrentPermissions,
  getCurrentPermissionsWithCache,
} from "../api/permissions/getCurrentPermissions";

// TypeScript Types
export type {
  Permission,
  UserPermissions,
  Role,
  PermissionContextState,
  PermissionContextActions,
  PermissionContextType,
  GetCurrentPermissionsResponse,
  PermissionTypes,
  PermissionStateTypes,
  PermissionKeys,
  PermissionCheckResult,
} from "../types/PermissionTypes";

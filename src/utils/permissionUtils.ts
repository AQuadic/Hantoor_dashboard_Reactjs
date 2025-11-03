import {
  Permission,
  Role,
  PermissionCheckResult,
} from "@/types/PermissionTypes";

/**
 * Checks if a user has a specific permission
 * @param userPermissions - Array of user's permissions
 * @param permissionKey - Permission key to check (single key or array of keys)
 * @returns boolean - True if user has the permission(s)
 */
export const hasPermission = (
  userPermissions: Permission[],
  permissionKey: string | string[]
): boolean => {
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }

  const permissionKeys = Array.isArray(permissionKey)
    ? permissionKey
    : [permissionKey];
  const userPermissionKeys = userPermissions.map((p) => p.key);

  // For array input, check if user has ALL permissions (AND logic)
  const result = permissionKeys.every((key) =>
    userPermissionKeys.includes(key)
  );

  return result;
};

/**
 * Checks if a user has any of the specified permissions
 * @param userPermissions - Array of user's permissions
 * @param permissionKeys - Array of permission keys to check
 * @returns boolean - True if user has at least one of the permissions
 */
export const hasAnyPermission = (
  userPermissions: Permission[],
  permissionKeys: string[]
): boolean => {
  if (
    !userPermissions ||
    userPermissions.length === 0 ||
    !permissionKeys ||
    permissionKeys.length === 0
  ) {
    return false;
  }

  const userPermissionKeys = userPermissions.map((p) => p.key);

  // Check if user has ANY of the specified permissions (OR logic)
  return permissionKeys.some((key) => userPermissionKeys.includes(key));
};

/**
 * Checks if a user has all of the specified permissions
 * @param userPermissions - Array of user's permissions
 * @param permissionKeys - Array of permission keys to check
 * @returns boolean - True if user has all of the permissions
 */
export const hasAllPermissions = (
  userPermissions: Permission[],
  permissionKeys: string[]
): boolean => {
  if (
    !userPermissions ||
    userPermissions.length === 0 ||
    !permissionKeys ||
    permissionKeys.length === 0
  ) {
    return false;
  }

  const userPermissionKeys = userPermissions.map((p) => p.key);

  // Check if user has ALL of the specified permissions (AND logic)
  return permissionKeys.every((key) => userPermissionKeys.includes(key));
};

/**
 * Checks if a user has a specific role
 * @param userRoles - Array of user's roles
 * @param roleKey - Role key to check (single key or array of keys)
 * @returns boolean - True if user has the role(s)
 */
export const hasRole = (
  userRoles: Role[],
  roleKey: string | string[]
): boolean => {
  if (!userRoles || userRoles.length === 0) {
    return false;
  }

  const roleKeys = Array.isArray(roleKey) ? roleKey : [roleKey];
  const userRoleKeys = userRoles.map((r) => r.key);

  // For array input, check if user has ALL roles (AND logic)
  return roleKeys.every((key) => userRoleKeys.includes(key));
};

/**
 * Performs a detailed permission check with result information
 * @param userPermissions - Array of user's permissions
 * @param permissionKeys - Array of permission keys to check
 * @returns PermissionCheckResult - Detailed result of the permission check
 */
export const checkPermissions = (
  userPermissions: Permission[],
  permissionKeys: string[]
): PermissionCheckResult => {
  if (!userPermissions || userPermissions.length === 0) {
    return {
      granted: false,
      missingPermissions: permissionKeys,
      checkedPermissions: permissionKeys,
    };
  }

  const userPermissionKeys = userPermissions.map((p) => p.key);
  const missingPermissions = permissionKeys.filter(
    (key) => !userPermissionKeys.includes(key)
  );

  return {
    granted: missingPermissions.length === 0,
    missingPermissions:
      missingPermissions.length > 0 ? missingPermissions : undefined,
    checkedPermissions: permissionKeys,
  };
};

/**
 * Gets permissions by module/group
 * @param userPermissions - Array of user's permissions
 * @param module - Module name to filter by
 * @returns Permission[] - Filtered permissions
 */
export const getPermissionsByModule = (
  userPermissions: Permission[],
  module: string
): Permission[] => {
  if (!userPermissions || userPermissions.length === 0) {
    return [];
  }

  return userPermissions.filter(
    (permission) => permission.module === module || permission.group === module
  );
};

/**
 * Checks if user has any permission within a specific module
 * @param userPermissions - Array of user's permissions
 * @param module - Module name to check
 * @returns boolean - True if user has any permission in the module
 */
export const hasModuleAccess = (
  userPermissions: Permission[],
  module: string
): boolean => {
  const modulePermissions = getPermissionsByModule(userPermissions, module);
  return modulePermissions.length > 0;
};

/**
 * Gets all unique modules/groups from user permissions
 * @param userPermissions - Array of user's permissions
 * @returns string[] - Array of unique module names
 */
export const getUserModules = (userPermissions: Permission[]): string[] => {
  if (!userPermissions || userPermissions.length === 0) {
    return [];
  }

  const modules = new Set<string>();

  userPermissions.forEach((permission) => {
    if (permission.module) {
      modules.add(permission.module);
    }
    if (permission.group && permission.group !== permission.module) {
      modules.add(permission.group);
    }
  });

  return Array.from(modules);
};

/**
 * Debug utility to show permission information
 * @param userPermissions - Array of user's permissions
 * @param searchTerm - Optional search term to filter permissions
 */
export const debugPermissions = (
  userPermissions: Permission[],
  searchTerm?: string
) => {
  const filtered = searchTerm
    ? userPermissions.filter((p) =>
        p.key.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : userPermissions;

  console.log("🔐 Permission Debug:", {
    total: userPermissions.length,
    filtered: filtered.length,
    searchTerm,
    permissions: filtered.map((p) => ({
      key: p.key,
      name: p.name,
      module: p.module,
    })),
  });

  return filtered;
};

/**
 * Get permissions by pattern (contains search)
 * @param userPermissions - Array of user's permissions
 * @param pattern - Pattern to search for in permission keys
 * @returns Permission[] - Filtered permissions
 */
export const getPermissionsByPattern = (
  userPermissions: Permission[],
  pattern: string
): Permission[] => {
  if (!userPermissions || userPermissions.length === 0) {
    return [];
  }

  return userPermissions.filter((permission) =>
    permission.key.toLowerCase().includes(pattern.toLowerCase())
  );
};

/**
 * List of action prefixes that should be stripped when extracting resource names
 */
const ACTION_PREFIXES = new Set([
  "view",
  "create",
  "edit",
  "delete",
  "change-status",
  "change_status",
  "block",
  "link",
  "vehicle",
  "notes",
  "email",
  "star",
  "change-password",
  "vehicle_chat",
]);

/**
 * List of trailing suffixes that should be stripped (for dashboard counters, etc.)
 */
const TRAILING_SUFFIXES = new Set(["count", "dashboard"]);

/**
 * Extracts the resource name from a permission key
 * Strips action prefixes and trailing suffixes to get the core resource
 *
 * Examples:
 * - "view_user" -> "user"
 * - "create_admin" -> "admin"
 * - "edit_brand" -> "brand"
 * - "view_finances_count_dashboard" -> "finances" (strips count and dashboard)
 *
 * @param key - Permission key to extract resource from
 * @returns string - The extracted resource name
 */
export const extractResourceFromPermission = (key: string): string => {
  if (!key) return "";
  const parts = key.split("_");

  // Remove leading action prefixes
  while (parts.length > 0 && ACTION_PREFIXES.has(parts[0])) {
    parts.shift();
  }

  // Remove trailing suffixes like count/dashboard
  while (parts.length > 0 && TRAILING_SUFFIXES.has(parts.at(-1)!)) {
    parts.pop();
  }

  return parts.join("_");
};

/**
 * Checks if a user permission matches a required permission
 * Uses exact matching first, then falls back to resource-based matching
 * This avoids false positives from dashboard counter permissions
 *
 * @param userPermissionKey - The user's permission key
 * @param requiredPermission - The required permission to check against
 * @returns boolean - True if the permissions match
 */
export const permissionKeyMatches = (
  userPermissionKey: string,
  requiredPermission: string
): boolean => {
  // Exact match
  if (userPermissionKey === requiredPermission) {
    return true;
  }

  // Extract resources from both keys
  const userResource = extractResourceFromPermission(userPermissionKey);
  const requiredResource = extractResourceFromPermission(requiredPermission);

  // If either resource is empty, no match
  if (!userResource || !requiredResource) {
    return false;
  }

  // Match if resources are the same
  return userResource === requiredResource;
};

/**
 * Checks if a user has any of the required permissions
 * Uses the centralized permission matching logic
 *
 * @param userPermissions - Array of user's permission objects
 * @param requiredPermissions - Array of required permission keys
 * @returns boolean - True if user has at least one of the required permissions
 */
export const hasAnyRequiredPermission = (
  userPermissions: Permission[],
  requiredPermissions: string[]
): boolean => {
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }

  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }

  const userPermissionKeys = userPermissions.map((p) => p.key);

  // Check if any required permission matches any user permission
  return requiredPermissions.some((requiredPerm) =>
    userPermissionKeys.some((userPerm) =>
      permissionKeyMatches(userPerm, requiredPerm)
    )
  );
};

/**
 * Checks if a user has all of the required permissions
 * Uses the centralized permission matching logic
 *
 * @param userPermissions - Array of user's permission objects
 * @param requiredPermissions - Array of required permission keys
 * @returns boolean - True if user has all of the required permissions
 */
export const hasAllRequiredPermissions = (
  userPermissions: Permission[],
  requiredPermissions: string[]
): boolean => {
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }

  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }

  const userPermissionKeys = userPermissions.map((p) => p.key);

  // Check if all required permissions are matched by user permissions
  return requiredPermissions.every((requiredPerm) =>
    userPermissionKeys.some((userPerm) =>
      permissionKeyMatches(userPerm, requiredPerm)
    )
  );
};

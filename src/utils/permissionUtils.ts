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

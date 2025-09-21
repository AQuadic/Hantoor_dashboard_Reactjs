// Simple permission structure - matching actual API response
export interface Permission {
  key: string;
  // Optional fields for potential future expansion
  id?: number;
  name?: string;
  description?: string;
  module?: string;
  group?: string;
  titleEn?: string;
  titleAr?: string;
  created_at?: string;
  updated_at?: string;
}

// User's granted permissions response from API
export interface UserPermissions {
  permissions: Permission[];
  roles?: Role[];
  meta?: {
    total: number;
    loaded_at: string;
    expires_at?: string;
  };
}

// Role structure (if roles are part of permission system)
export interface Role {
  id: number;
  name: string;
  key: string;
  description?: string;
  permissions: Permission[];
  created_at?: string;
  updated_at?: string;
}

// Permission context state
export interface PermissionContextState {
  permissions: Permission[];
  roles: Role[];
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
  lastFetched: Date | null;
}

// Permission context actions
export interface PermissionContextActions {
  fetchPermissions: () => Promise<void>;
  refreshPermissions: () => Promise<void>;
  hasPermission: (permissionKey: string | string[]) => boolean;
  hasAnyPermission: (permissionKeys: string[]) => boolean;
  hasAllPermissions: (permissionKeys: string[]) => boolean;
  hasRole: (roleKey: string | string[]) => boolean;
  clearPermissions: () => void;
}

// Combined context type
export interface PermissionContextType
  extends PermissionContextState,
    PermissionContextActions {}

// API response types - matching actual backend response
export interface GetCurrentPermissionsResponse {
  current_permissions: string[];
}

// Alternative complex response structure (for future use)
export interface ComplexPermissionsResponse {
  success: boolean;
  data: UserPermissions;
  message?: string;
}

// Legacy types (keeping for backward compatibility)
export interface PermissionTypes {
  titleEn: string;
  titleAr: string;
}

export interface PermissionStateTypes {
  permission: PermissionTypes;
  isSelected: boolean;
}

// Utility types for permission checking
export type PermissionKeys = string[];

// Permission check result
export interface PermissionCheckResult {
  granted: boolean;
  missingPermissions?: string[];
  checkedPermissions: string[];
}

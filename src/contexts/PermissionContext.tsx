import React, {
  useCallback,
  useReducer,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import {
  PermissionContextType,
  PermissionContextState,
  Permission,
  Role,
} from "@/types/PermissionTypes";
import { getCurrentPermissions } from "@/api/permissions/getCurrentPermissions";
import {
  hasPermission as utilHasPermission,
  hasAnyPermission as utilHasAnyPermission,
  hasAllPermissions as utilHasAllPermissions,
  hasRole as utilHasRole,
} from "@/utils/permissionUtils";

// Action types for the reducer
type PermissionAction =
  | { type: "FETCH_PERMISSIONS_START" }
  | {
      type: "FETCH_PERMISSIONS_SUCCESS";
      payload: { permissions: Permission[]; roles: Role[] };
    }
  | { type: "FETCH_PERMISSIONS_ERROR"; payload: string }
  | { type: "CLEAR_PERMISSIONS" };

// Initial state
const initialState: PermissionContextState = {
  permissions: [],
  roles: [],
  isLoading: false,
  isLoaded: false,
  error: null,
  lastFetched: null,
};

// Reducer function
const permissionReducer = (
  state: PermissionContextState,
  action: PermissionAction
): PermissionContextState => {
  switch (action.type) {
    case "FETCH_PERMISSIONS_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_PERMISSIONS_SUCCESS":
      return {
        ...state,
        permissions: action.payload.permissions,
        roles: action.payload.roles,
        isLoading: false,
        isLoaded: true,
        error: null,
        lastFetched: new Date(),
      };
    case "FETCH_PERMISSIONS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CLEAR_PERMISSIONS":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

import { PermissionContext } from "./permission-context";

// Provider component props
interface PermissionProviderProps {
  children: ReactNode;
  autoFetch?: boolean; // Whether to automatically fetch permissions on mount
  refreshInterval?: number; // Auto refresh interval in milliseconds (optional)
}

// Provider component
export const PermissionProvider: React.FC<PermissionProviderProps> = ({
  children,
  autoFetch = true,
  refreshInterval,
}) => {
  const [state, dispatch] = useReducer(permissionReducer, initialState);

  // Internal fetch function to avoid dependency issues
  const fetchPermissionsInternal = useCallback(async () => {
    dispatch({ type: "FETCH_PERMISSIONS_START" });

    try {
      const response = await getCurrentPermissions();

      if (
        response.current_permissions &&
        Array.isArray(response.current_permissions)
      ) {
        // Convert string array to Permission objects
        const permissions: Permission[] = response.current_permissions.map(
          (permissionKey) => ({
            key: permissionKey,
            name: permissionKey
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            titleEn: permissionKey
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
          })
        );

        dispatch({
          type: "FETCH_PERMISSIONS_SUCCESS",
          payload: {
            permissions,
            roles: [], // No roles in current API response
          },
        });

        // Debug logging
        console.log("🔐 Permissions loaded:", {
          count: permissions.length,
          keys: permissions.map((p) => p.key),
          sample: permissions.slice(0, 5),
          userPermissions: permissions
            .filter((p) => p.key.includes("user"))
            .map((p) => p.key),
        });

        // Make permissions available globally for debugging
        if (typeof window !== "undefined") {
          (window as { debugPermissions?: Permission[] }).debugPermissions =
            permissions;
          console.log(
            "🔐 Debug: Use window.debugPermissions to inspect permissions in console"
          );
        }
      } else {
        throw new Error("Invalid permissions response format");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      dispatch({
        type: "FETCH_PERMISSIONS_ERROR",
        payload: errorMessage,
      });
      console.error("Error fetching permissions:", error);
    }
  }, []);

  // Public fetch permissions function
  const fetchPermissions = useCallback(async () => {
    await fetchPermissionsInternal();
  }, [fetchPermissionsInternal]);

  // Refresh permissions (alias for fetchPermissions)
  const refreshPermissions = useCallback(async () => {
    await fetchPermissions();
  }, [fetchPermissions]);

  // Clear permissions
  const clearPermissions = useCallback(() => {
    dispatch({ type: "CLEAR_PERMISSIONS" });
  }, []);

  // Permission checking functions using utilities
  const hasPermission = useCallback(
    (permissionKey: string | string[]): boolean => {
      return utilHasPermission(state.permissions, permissionKey);
    },
    [state.permissions]
  );

  const hasAnyPermission = useCallback(
    (permissionKeys: string[]): boolean => {
      return utilHasAnyPermission(state.permissions, permissionKeys);
    },
    [state.permissions]
  );

  const hasAllPermissions = useCallback(
    (permissionKeys: string[]): boolean => {
      return utilHasAllPermissions(state.permissions, permissionKeys);
    },
    [state.permissions]
  );

  const hasRole = useCallback(
    (roleKey: string | string[]): boolean => {
      return utilHasRole(state.roles, roleKey);
    },
    [state.roles]
  );

  // Auto-fetch permissions on mount
  useEffect(() => {
    const shouldFetch = autoFetch && !state.isLoaded && !state.isLoading;
    if (shouldFetch) {
      fetchPermissionsInternal();
    }
  }, [autoFetch, state.isLoaded, state.isLoading, fetchPermissionsInternal]);

  // Auto-refresh functionality
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(() => {
        if (!state.isLoading) {
          fetchPermissionsInternal();
        }
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, state.isLoading, fetchPermissionsInternal]);

  // Context value - memoized to prevent unnecessary re-renders
  const contextValue: PermissionContextType = useMemo(
    () => ({
      // State
      permissions: state.permissions,
      roles: state.roles,
      isLoading: state.isLoading,
      isLoaded: state.isLoaded,
      error: state.error,
      lastFetched: state.lastFetched,

      // Actions
      fetchPermissions,
      refreshPermissions,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      hasRole,
      clearPermissions,
    }),
    [
      state.permissions,
      state.roles,
      state.isLoading,
      state.isLoaded,
      state.error,
      state.lastFetched,
      fetchPermissions,
      refreshPermissions,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      hasRole,
      clearPermissions,
    ]
  );

  return (
    <PermissionContext.Provider value={contextValue}>
      {children}
    </PermissionContext.Provider>
  );
};

// Display name for debugging
PermissionProvider.displayName = "PermissionProvider";

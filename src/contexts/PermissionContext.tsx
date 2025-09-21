import React, {
  useCallback,
  useReducer,
  useEffect,
  ReactNode,
  useMemo,
  useRef,
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
import { useAuthStore } from "@/store/useAuthStore";

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
      console.log("🔐 Permissions: Starting fetch...");
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_PERMISSIONS_SUCCESS":
      console.log("🔐 Permissions: Fetch successful, updating state...");
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
      console.log("🔐 Permissions: Fetch error:", action.payload);
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "CLEAR_PERMISSIONS":
      console.log("🔐 Permissions: Clearing all permissions...");
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

  // Get auth state from store
  const { isAuthenticated, token } = useAuthStore();

  // Use refs to store current auth values to avoid dependency issues
  const authRef = useRef({ isAuthenticated, token });
  authRef.current = { isAuthenticated, token };

  // Flag to prevent multiple simultaneous fetches
  const fetchingRef = useRef(false);

  // Internal fetch function to avoid dependency issues
  const fetchPermissionsInternal = useCallback(async () => {
    // Check auth state from ref to avoid circular dependencies
    if (!authRef.current.isAuthenticated || !authRef.current.token) {
      console.log("🔐 Skipping permission fetch - user not authenticated");
      return;
    }

    // Prevent multiple simultaneous fetches
    if (fetchingRef.current) {
      console.log("🔐 Skipping permission fetch - already in progress");
      return;
    }

    fetchingRef.current = true;
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
    } finally {
      fetchingRef.current = false;
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

  // Combined effect to handle auth state changes and auto-fetch
  useEffect(() => {
    console.log("🔐 Auth/State effect triggered:", {
      isAuthenticated,
      hasToken: !!token,
      isLoaded: state.isLoaded,
      isLoading: state.isLoading,
      autoFetch,
    });

    if (isAuthenticated && token) {
      // User is authenticated
      if (!state.isLoaded && !state.isLoading) {
        console.log("🔐 Fetching permissions for authenticated user...");
        fetchPermissionsInternal();
      }
    } else if (state.isLoaded || state.permissions.length > 0) {
      // User is not authenticated - clear permissions
      console.log("🔐 Clearing permissions for unauthenticated user...");
      dispatch({ type: "CLEAR_PERMISSIONS" });
    }
  }, [
    isAuthenticated,
    token,
    state.isLoaded,
    state.isLoading,
    state.permissions.length,
    autoFetch,
    fetchPermissionsInternal,
  ]);

  // Auto-refresh functionality
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(() => {
        if (
          !state.isLoading &&
          authRef.current.isAuthenticated &&
          authRef.current.token
        ) {
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

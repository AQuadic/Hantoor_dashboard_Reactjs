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

// Since sidebar and API use the same format (underscore notation),
// we should not transform permissions - keep them as-is
// The routes should be updated to match the API format

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

  // Flag to prevent multiple simultaneous fetches
  const fetchingRef = useRef(false);

  // Internal fetch function
  const performFetch = useCallback(async () => {
    if (!isAuthenticated || !token) {
      console.log("🔐 Skipping permission fetch - user not authenticated");
      return;
    }

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
        // Convert string array to Permission objects - keep original API format
        const permissions: Permission[] = response.current_permissions.map(
          (permissionKey) => {
            return {
              key: permissionKey, // Keep original API format (e.g., view_user, create_admin)
              name: permissionKey
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase()),
              titleEn: permissionKey
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase()),
            };
          }
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
          apiPermissions: response.current_permissions,
          userPermissions: permissions.filter((p) => p.key.includes("user")),
          adminPermissions: permissions.filter((p) => p.key.includes("admin")),
          agentPermissions: permissions.filter((p) => p.key.includes("agent")),
        });

        // Make permissions available globally for debugging
        if (typeof window !== "undefined") {
          (window as { debugPermissions?: Permission[] }).debugPermissions =
            permissions;
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
  }, [isAuthenticated, token]);

  // Public fetch permissions function
  const fetchPermissions = useCallback(async () => {
    await performFetch();
  }, [performFetch]);

  // Refresh permissions (alias for fetchPermissions)
  const refreshPermissions = useCallback(async () => {
    await performFetch();
  }, [performFetch]);

  // Clear permissions
  const clearPermissions = useCallback(() => {
    dispatch({ type: "CLEAR_PERMISSIONS" });
  }, []);

  // Permission checking functions using utilities
  const hasPermission = useCallback(
    (permissionKey: string | string[]): boolean => {
      // `view_terms` is public and should always be available to all users.
      // Short-circuit checks here to avoid injecting fake permissions into state.
      if (typeof permissionKey === "string") {
        if (permissionKey === "view_terms") return true;
      } else if (Array.isArray(permissionKey)) {
        if (permissionKey.includes("view_terms")) return true;
      }

      return utilHasPermission(state.permissions, permissionKey);
    },
    [state.permissions]
  );

  const hasAnyPermission = useCallback(
    (permissionKeys: string[]): boolean => {
      // If any of the requested permissions is `view_terms`, consider it satisfied.
      if (permissionKeys.includes("view_terms")) return true;

      return utilHasAnyPermission(state.permissions, permissionKeys);
    },
    [state.permissions]
  );

  const hasAllPermissions = useCallback(
    (permissionKeys: string[]): boolean => {
      // `view_terms` is public so remove it from the required list when checking "all".
      const filtered = permissionKeys.filter((k) => k !== "view_terms");
      // If after filtering there are no required permissions left, return true
      if (filtered.length === 0) return true;

      return utilHasAllPermissions(state.permissions, filtered);
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
      if (!state.isLoaded && !state.isLoading && autoFetch) {
        console.log("🔐 Fetching permissions for authenticated user...");
        performFetch();
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
    performFetch,
  ]);

  // Auto-refresh functionality
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(() => {
        if (!state.isLoading && isAuthenticated && token) {
          performFetch();
        }
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, state.isLoading, isAuthenticated, token, performFetch]);

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

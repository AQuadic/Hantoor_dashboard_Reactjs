import React, { ReactNode } from "react";
import { useCanAccess } from "@/hooks/useCanAccess";

// Utility hook for checking if a section should be visible
export const useSectionVisibility = (
  permissions: string | string[],
  mode: "require" | "requireAny" | "requireAll" | "requireRole" = "requireAny"
) => {
  const { canAccess, isLoading } = useCanAccess({
    permissions,
    mode,
  });

  return {
    isVisible: canAccess && !isLoading,
    isLoading,
    canAccess,
  };
};

// Higher-order component for adding permission checks to any component
export const withPermissions = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  requiredPermissions: string | string[],
  options: {
    mode?: "require" | "requireAny" | "requireAll" | "requireRole";
    fallback?: ReactNode;
    debug?: boolean;
  } = {}
) => {
  const WrappedComponent: React.FC<P> = (props) => {
    const { mode = "requireAny", fallback = null, debug = false } = options;

    const { canAccess, isLoading } = useCanAccess({
      permissions: requiredPermissions,
      mode,
    });

    if (debug) {
      console.log("🔒 withPermissions HOC Debug:", {
        requiredPermissions,
        mode,
        canAccess,
        isLoading,
        componentName: Component.displayName || Component.name,
      });
    }

    if (isLoading) {
      return <div className="animate-pulse bg-gray-200 h-8 rounded"></div>;
    }

    if (!canAccess) {
      return <>{fallback}</>;
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withPermissions(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};

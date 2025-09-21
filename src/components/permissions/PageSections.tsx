import React, { ReactNode } from "react";
import { useCanAccess } from "@/hooks/useCanAccess";

// Props for section visibility control
export interface PageSectionProps {
  children: ReactNode;
  requiredPermissions?: string | string[];
  mode?: "require" | "requireAny" | "requireAll" | "requireRole"; // Access mode - matches useCanAccess
  requiredRoles?: string | string[];
  fallback?: ReactNode; // What to show when user doesn't have access
  debug?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Component to conditionally render entire page sections
export const PageSection: React.FC<PageSectionProps> = ({
  children,
  requiredPermissions,
  mode = "requireAny",
  requiredRoles,
  fallback = null,
  debug = false,
  className,
  style,
}) => {
  const { canAccess, isLoading } = useCanAccess({
    permissions: requiredPermissions,
    roles: requiredRoles,
    mode,
  });

  if (debug) {
    console.log("🏗️ PageSection Debug:", {
      requiredPermissions,
      requiredRoles,
      mode,
      canAccess,
      isLoading,
    });
  }

  // While loading permissions, optionally show loading state
  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-4 rounded"></div>;
  }

  // If user doesn't have required permissions, show fallback or hide
  if (!canAccess) {
    return <>{fallback}</>;
  }

  // User has access, render the section
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

// Specialized components for common page sections
export const UserManagementSection: React.FC<
  Omit<PageSectionProps, "requiredPermissions">
> = (props) => (
  <PageSection
    requiredPermissions={[
      "view_user",
      "create_user",
      "edit_user",
      "delete_user",
    ]}
    mode="requireAny"
    {...props}
  />
);

export const AdminSection: React.FC<
  Omit<PageSectionProps, "requiredPermissions">
> = (props) => (
  <PageSection
    requiredPermissions={["admin_access", "super_admin"]}
    mode="requireAny"
    {...props}
  />
);

export const VehicleManagementSection: React.FC<
  Omit<PageSectionProps, "requiredPermissions">
> = (props) => (
  <PageSection
    requiredPermissions={[
      "view_vehicle",
      "create_vehicle",
      "edit_vehicle",
      "delete_vehicle",
    ]}
    mode="requireAny"
    {...props}
  />
);

export const FinancingSection: React.FC<
  Omit<PageSectionProps, "requiredPermissions">
> = (props) => (
  <PageSection
    requiredPermissions={[
      "view_financing",
      "create_financing",
      "edit_financing",
    ]}
    mode="requireAny"
    {...props}
  />
);

export const ReportsSection: React.FC<
  Omit<PageSectionProps, "requiredPermissions">
> = (props) => (
  <PageSection
    requiredPermissions={["view_reports", "generate_reports"]}
    mode="requireAny"
    {...props}
  />
);

export const SettingsSection: React.FC<
  Omit<PageSectionProps, "requiredPermissions">
> = (props) => (
  <PageSection
    requiredPermissions={["manage_settings", "system_config"]}
    mode="requireAny"
    {...props}
  />
);

export default PageSection;

import React, { ReactNode } from "react";
import { useCanAccess } from "@/hooks/useCanAccess";

// Button style type aliases
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning";
export type ButtonSize = "sm" | "md" | "lg";

// Common button props interface
export interface BaseButtonProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;

  // Permission-specific props
  resource?: string; // e.g., "user" for create_user, edit_user, etc.
  permission?: string; // Override default permission
  hideOnNoAccess?: boolean; // If true, completely hide button instead of showing disabled
  fallback?: ReactNode; // Show this instead of button when no access

  // Debug
  debug?: boolean;
}

// Base button styles for different variants
const getButtonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean
) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: disabled
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: disabled
      ? "bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed"
      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
    danger: disabled
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: disabled
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    warning: disabled
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
  };

  return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;
};

// Generic permission-aware button
export const PermissionButton: React.FC<
  BaseButtonProps & { requiredPermission: string }
> = ({
  children,
  className = "",
  style,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  requiredPermission,
  hideOnNoAccess = false,
  fallback = null,
  debug = false,
  ...props
}) => {
  const { canAccess, isLoading } = useCanAccess({
    permissions: requiredPermission,
  });

  const isDisabled = disabled || loading || isLoading;
  const hasAccess = canAccess && !isLoading;

  if (debug) {
    console.log("🔐 PermissionButton Debug:", {
      requiredPermission,
      canAccess,
      isLoading,
      hasAccess,
    });
  }

  // If hideOnNoAccess is true and user has no access, hide completely
  if (hideOnNoAccess && !hasAccess) {
    return <>{fallback}</>;
  }

  const finalClassName = `${getButtonStyles(
    variant,
    size,
    isDisabled || !hasAccess
  )} ${className}`;

  return (
    <button
      type={type}
      className={finalClassName}
      style={style}
      onClick={hasAccess ? onClick : undefined}
      disabled={isDisabled || !hasAccess}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
      {children}
    </button>
  );
};

// Specialized button components
export const CreateButton: React.FC<BaseButtonProps> = ({
  resource,
  permission,
  children = "Create",
  variant = "primary",
  icon,
  ...props
}) => {
  const requiredPermission =
    permission || (resource ? `create_${resource}` : "");

  const defaultIcon = icon || (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );

  return (
    <PermissionButton
      requiredPermission={requiredPermission}
      variant={variant}
      icon={defaultIcon}
      {...props}
    >
      {children}
    </PermissionButton>
  );
};

export const EditButton: React.FC<BaseButtonProps> = ({
  resource,
  permission,
  children = "Edit",
  variant = "secondary",
  icon,
  ...props
}) => {
  const requiredPermission = permission || (resource ? `edit_${resource}` : "");

  const defaultIcon = icon || (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );

  return (
    <PermissionButton
      requiredPermission={requiredPermission}
      variant={variant}
      icon={defaultIcon}
      {...props}
    >
      {children}
    </PermissionButton>
  );
};

export const DeleteButton: React.FC<BaseButtonProps> = ({
  resource,
  permission,
  children = "Delete",
  variant = "danger",
  icon,
  ...props
}) => {
  const requiredPermission =
    permission || (resource ? `delete_${resource}` : "");

  const defaultIcon = icon || (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );

  return (
    <PermissionButton
      requiredPermission={requiredPermission}
      variant={variant}
      icon={defaultIcon}
      {...props}
    >
      {children}
    </PermissionButton>
  );
};

export const ViewButton: React.FC<BaseButtonProps> = ({
  resource,
  permission,
  children = "View",
  variant = "secondary",
  icon,
  ...props
}) => {
  const requiredPermission = permission || (resource ? `view_${resource}` : "");

  const defaultIcon = icon || (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

  return (
    <PermissionButton
      requiredPermission={requiredPermission}
      variant={variant}
      icon={defaultIcon}
      {...props}
    >
      {children}
    </PermissionButton>
  );
};

// Compound component for action button groups
export const ActionButtons: React.FC<{
  resource: string;
  onView?: () => void;
  onCreate?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showLabels?: boolean;
  size?: ButtonSize;
  className?: string;
}> = ({
  resource,
  onView,
  onCreate,
  onEdit,
  onDelete,
  showLabels = false,
  size = "sm",
  className = "",
}) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {onView && (
        <ViewButton
          resource={resource}
          onClick={onView}
          size={size}
          hideOnNoAccess={true}
        >
          {showLabels ? "View" : undefined}
        </ViewButton>
      )}
      {onCreate && (
        <CreateButton
          resource={resource}
          onClick={onCreate}
          size={size}
          hideOnNoAccess={true}
        >
          {showLabels ? "Create" : undefined}
        </CreateButton>
      )}
      {onEdit && (
        <EditButton
          resource={resource}
          onClick={onEdit}
          size={size}
          hideOnNoAccess={true}
        >
          {showLabels ? "Edit" : undefined}
        </EditButton>
      )}
      {onDelete && (
        <DeleteButton
          resource={resource}
          onClick={onDelete}
          size={size}
          hideOnNoAccess={true}
        >
          {showLabels ? "Delete" : undefined}
        </DeleteButton>
      )}
    </div>
  );
};

export default PermissionButton;

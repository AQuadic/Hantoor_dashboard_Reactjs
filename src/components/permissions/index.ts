// Main permission components
export { default as ProtectedComponent } from "./ProtectedComponent";
export type {
  ProtectedComponentProps,
  PermissionMode,
} from "./ProtectedComponent";

// Permission-aware buttons
export {
  CreateButton,
  EditButton,
  DeleteButton,
  ViewButton,
  ActionButtons,
  PermissionButton,
} from "./PermissionButtons";
export type {
  BaseButtonProps,
  ButtonVariant,
  ButtonSize,
} from "./PermissionButtons";

// Page sections
export {
  default as PageSection,
  UserManagementSection,
  AdminSection,
  VehicleManagementSection,
  FinancingSection,
  ReportsSection,
  SettingsSection,
} from "./PageSections";
export type { PageSectionProps } from "./PageSections";

// Utility functions (from separate file)
export {
  useSectionVisibility,
  withPermissions,
} from "../../utils/permissionSectionUtils";

// Hooks
export { useCanAccess } from "../../hooks/useCanAccess";
export type { AccessConfig, AccessResult } from "../../hooks/useCanAccess";

export {
  usePermissions,
  useHasPermission,
  useHasAnyPermission,
  useHasAllPermissions,
  useHasRole,
} from "../../hooks/usePermissions";

// Examples
export { default as PermissionUIDemo } from "../examples/PermissionUIDemo";

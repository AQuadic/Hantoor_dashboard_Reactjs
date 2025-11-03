import { useMemo } from "react";
import { SidebarLinks, type SidebarLink } from "@/constants/SidebarLinks";
import { usePermissions } from "@/hooks/usePermissions";
import {
  hasAnyRequiredPermission,
  hasAllRequiredPermissions,
} from "@/utils/permissionUtils";

/**
 * Hook that filters sidebar links based on user permissions
 * Returns only the sidebar links that the user has permission to access
 */
export const useFilteredSidebarLinks = (): SidebarLink[] => {
  const { permissions } = usePermissions();

  // Filter sidebar links based on permissions
  const filteredLinks = useMemo(() => {
    return SidebarLinks.filter((link) => {
      // If no permissions required, always show the link (e.g., Dashboard, Logout)
      if (!link.requiredPermissions || link.requiredPermissions.length === 0) {
        return true;
      }

      // Use requireAny/requireAll semantics to determine visibility.
      // Default is requireAny = true, meaning user needs ANY of the permissions
      const requireAny = link.requireAny ?? true;

      if (requireAny) {
        // Show link if user has ANY of the required permissions
        return hasAnyRequiredPermission(permissions, link.requiredPermissions);
      }

      // Otherwise, require ALL permissions
      return hasAllRequiredPermissions(permissions, link.requiredPermissions);
    });
  }, [permissions]);

  return filteredLinks;
};

export default useFilteredSidebarLinks;

import { useMemo } from "react";
import { SidebarLinks, type SidebarLink } from "@/constants/SidebarLinks";
import { usePermissions } from "@/hooks/usePermissions";

/**
 * Hook that filters sidebar links based on user permissions
 * Returns only the sidebar links that the user has permission to access
 */
export const useFilteredSidebarLinks = (): SidebarLink[] => {
  const { permissions } = usePermissions();

  // Filter sidebar links based on permissions
  const filteredLinks = useMemo(() => {
    // Get permission keys for easier checking
    const permissionKeys = permissions.map((p) => p.key);

    return SidebarLinks.filter((link) => {
      // If no permissions required, always show the link (e.g., Dashboard, Logout)
      if (!link.requiredPermissions || link.requiredPermissions.length === 0) {
        return true;
      }

      // Check if user has required permissions
      if (link.requireAny !== false) {
        // Default is requireAny: true
        // User needs ANY of the required permissions
        return link.requiredPermissions.some((permission) =>
          permissionKeys.includes(permission)
        );
      } else {
        // User needs ALL of the required permissions
        return link.requiredPermissions.every((permission) =>
          permissionKeys.includes(permission)
        );
      }
    });
  }, [permissions]);

  return filteredLinks;
};

export default useFilteredSidebarLinks;

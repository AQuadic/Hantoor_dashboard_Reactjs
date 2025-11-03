import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { PermissionsTable } from "@/components/subordinates/PermissionsTable";
import SubordinatesHeader from "@/components/subordinates/SubordinatesHeader";
import { SubordinatesTable } from "@/components/subordinates/SubordinatesTable";
import { useDatePicker } from "@/hooks/useDatePicker";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useHasAnyPermission } from "@/hooks/usePermissions";
import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "@/api/admins/getAdmins";
import { getRoles } from "@/api/roles/getRoles";

const SubordinatesPage = () => {
  // Determine available view permissions for tabs
  // User can access Subordinates tab if they have ANY admin-related permission
  // Note: There is no "view_admin" permission in the API, only CRUD operations
  const canViewSubordinates = useHasAnyPermission([
    "create_admin",
    "edit_admin",
    "delete_admin",
    "change-status_admin",
    "change-password_admin",
  ]);

  // User can access Permissions tab if they have ANY permission or role-related permission
  // Note: There are no "view_role" or "view_permission" permissions in the API, only CRUD operations
  const canViewPermissionsTab = useHasAnyPermission([
    "create_permission",
    "edit_permission",
    "delete_permission",
    "change-status_permission",
  ]);

  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize selectedFilter from URL if present and permitted; otherwise
  // fall back to permission-based default. This prevents the header from
  // overwriting the URL on mount and creates a single source of truth for
  // tab selection which fixes back-button navigation issues.
  const initialTabFromUrl = searchParams.get("tab");
  const initialSelected = ((): "Subordinates" | "Permissions" => {
    if (initialTabFromUrl === "Subordinates" && canViewSubordinates)
      return "Subordinates";
    if (initialTabFromUrl === "Permissions" && canViewPermissionsTab)
      return "Permissions";
    if (canViewSubordinates) return "Subordinates";
    if (canViewPermissionsTab) return "Permissions";
    return "Subordinates";
  })();

  const [selectedFilter, setSelectedFilter] = useState<
    "Subordinates" | "Permissions"
  >(initialSelected);

  const location = useLocation();

  // When selectedFilter changes (user clicks tabs), update the URL but use
  // replace:true to avoid creating a history entry for every tab click. This
  // mirrors the pattern used in `ModelPage` and prevents back/forward spam.
  useEffect(() => {
    // Only update the search params when we're on the subordinates route to
    // avoid changing search params for other pages (and to prevent
    // cross-route history spam).
    if (!location.pathname.startsWith("/subordinates")) return;

    const currentTab = searchParams.get("tab");
    if (selectedFilter && currentTab !== selectedFilter) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("tab", selectedFilter);
      // Use replace so tab clicks don't create history entries that the
      // back button would need to step through.
      setSearchParams(newParams, { replace: true });
    }
  }, [selectedFilter, searchParams, setSearchParams, location.pathname]);

  const [searchTermAr, setSearchTermAr] = useState("");
  const [searchTermEn, setSearchTermEn] = useState("");
  const { dateRange, setDateRange, dateParams } = useDatePicker();

  const [subordinatesCurrentPage, setSubordinatesCurrentPage] = useState(1);
  const [subordinatesItemsPerPage] = useState(20);

  const [permissionsCurrentPage, setPermissionsCurrentPage] = useState(1);
  const [permissionsItemsPerPage] = useState(20);

  const activeSearchTerm = searchTermEn || searchTermAr;

  // Reset pages to 1 when search term changes
  useEffect(() => {
    if (activeSearchTerm) {
      setSubordinatesCurrentPage(1);
      setPermissionsCurrentPage(1);
    }
  }, [activeSearchTerm]);

  // If permissions change (for example user lacks subordinates view but has permissions view),
  // ensure selectedFilter points to an available tab.
  useEffect(() => {
    if (selectedFilter === "Subordinates" && !canViewSubordinates) {
      if (canViewPermissionsTab) setSelectedFilter("Permissions");
    }
    if (selectedFilter === "Permissions" && !canViewPermissionsTab) {
      if (canViewSubordinates) setSelectedFilter("Subordinates");
    }
  }, [canViewSubordinates, canViewPermissionsTab, selectedFilter]);

  const { data: subordinatesData } = useQuery({
    queryKey: [
      "admins",
      subordinatesCurrentPage,
      subordinatesItemsPerPage,
      searchTermAr,
      searchTermEn,
      dateParams,
    ],
    queryFn: () =>
      getAdmins({
        search:
          selectedFilter === "Subordinates" && canViewSubordinates
            ? searchTermEn || searchTermAr
            : "",
        pagination: "normal",
        per_page: subordinatesItemsPerPage,
        page: subordinatesCurrentPage,
        ...dateParams,
      }),
    enabled: selectedFilter === "Subordinates" && canViewSubordinates,
  });

  const { data: permissionsData } = useQuery({
    queryKey: [
      "roles",
      permissionsCurrentPage,
      permissionsItemsPerPage,
      searchTermAr,
      searchTermEn,
      dateParams,
    ],
    queryFn: () =>
      getRoles({
        search:
          selectedFilter === "Permissions" && canViewPermissionsTab
            ? searchTermEn || searchTermAr
            : "",
        pagination: "normal",
        per_page: permissionsItemsPerPage,
        page: permissionsCurrentPage,
        is_active: true,
        ...dateParams,
      }),
    enabled: selectedFilter === "Permissions" && canViewPermissionsTab,
  });

  const subordinatesTotalItems = subordinatesData?.meta?.total || 0;
  const subordinatesTotalPages = subordinatesData?.meta?.last_page || 1;
  const subordinatesFrom = subordinatesData?.meta?.from || 0;
  const subordinatesTo = subordinatesData?.meta?.to || 0;

  const permissionsTotalItems = permissionsData?.total || 0;
  const permissionsTotalPages = Math.ceil(
    permissionsTotalItems / permissionsItemsPerPage
  );
  const permissionsFrom =
    permissionsTotalItems > 0
      ? (permissionsCurrentPage - 1) * permissionsItemsPerPage + 1
      : 0;
  const permissionsTo = Math.min(
    permissionsCurrentPage * permissionsItemsPerPage,
    permissionsTotalItems
  );

  return (
    <section>
      <SubordinatesHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        setTermAr={setSearchTermAr}
        setTermEn={setSearchTermEn}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div className="px-2 md:px-8 relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {selectedFilter === "Subordinates" ? (
            <motion.div
              key="subordinates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SubordinatesTable
                currentPage={subordinatesCurrentPage}
                itemsPerPage={subordinatesItemsPerPage}
                searchTerm={searchTermAr || searchTermEn}
                dateParams={dateParams}
              />
              {subordinatesTotalItems > 0 && (
                <TablePagination
                  currentPage={subordinatesCurrentPage}
                  setCurrentPage={setSubordinatesCurrentPage}
                  itemsPerPage={subordinatesItemsPerPage}
                  totalPages={subordinatesTotalPages}
                  totalItems={subordinatesTotalItems}
                  from={subordinatesFrom}
                  to={subordinatesTo}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="permissions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PermissionsTable
                currentPage={permissionsCurrentPage}
                itemsPerPage={permissionsItemsPerPage}
                searchTerm={searchTermAr || searchTermEn}
                dateParams={dateParams}
              />
              {permissionsTotalItems > 0 && (
                <TablePagination
                  currentPage={permissionsCurrentPage}
                  setCurrentPage={setPermissionsCurrentPage}
                  itemsPerPage={permissionsItemsPerPage}
                  totalPages={permissionsTotalPages}
                  totalItems={permissionsTotalItems}
                  from={permissionsFrom}
                  to={permissionsTo}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SubordinatesPage;

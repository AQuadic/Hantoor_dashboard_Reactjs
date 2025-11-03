import React from "react";
import { Link } from "react-router-dom";
import DashboardButton from "../general/dashboard/DashboardButton";
import { useHasPermission, useHasAnyPermission } from "@/hooks/usePermissions";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import TabsFilter from "../general/dashboard/TabsFilter";
import { RangeValue } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";

interface SubordinatesHeaderProps {
  selectedFilter: "Subordinates" | "Permissions";
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<"Subordinates" | "Permissions">
  >;
  setTermAr: React.Dispatch<React.SetStateAction<string>>;
  setTermEn: React.Dispatch<React.SetStateAction<string>>;
  dateRange: RangeValue<CalendarDate> | null;
  setDateRange: (range: RangeValue<CalendarDate> | null) => void;
}

const SubordinatesHeader: React.FC<SubordinatesHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
  setTermAr,
  setTermEn,
  dateRange,
  setDateRange,
}) => {
  const canCreateAdmin = useHasPermission("create_admin");
  const canCreatePermission = useHasPermission("create_permission");

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

  // Build available filters based on explicit view permissions for each tab
  const filters = [] as {
    titleAr: string;
    titleEn: "Subordinates" | "Permissions";
  }[];

  if (canViewSubordinates) {
    filters.push({ titleAr: "المسؤولين الفرعيين", titleEn: "Subordinates" });
  }
  if (canViewPermissionsTab) {
    filters.push({ titleAr: " الصلاحيات", titleEn: "Permissions" });
  }

  // Note: URL synchronization is handled by the page component (`SubordinatesPage`).
  // This header component only renders UI and notifies the parent of tab
  // changes through `setSelectedFilter`. Keeping URL sync centralized avoids
  // cycles between header and page writing to history/search params.

  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="المسؤولين الفرعيين"
        titleEn="Subordinates"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "المسؤولين الفرعيين", titleEn: "Subordinates" },
        ]}
      />

      <TabsFilter
        filters={filters}
        selectedFilter={selectedFilter}
        setSelectedFilter={(f) => {
          // If the selected tab isn't available, pick the first available filter
          if (f === "Subordinates" && !canViewSubordinates) {
            if (canViewPermissionsTab) setSelectedFilter("Permissions");
            return;
          }
          if (f === "Permissions" && !canViewPermissionsTab) {
            if (canViewSubordinates) setSelectedFilter("Subordinates");
            return;
          }

          setSelectedFilter(f as "Subordinates" | "Permissions");
        }}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={""}
            termEn={""}
            placeholderAr="ابحث"
            placeholderEn="Search"
            setTermAr={setTermAr}
            setTermEn={setTermEn}
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker value={dateRange} onChange={setDateRange} />
        </div>
        {selectedFilter === "Subordinates"
          ? canCreateAdmin && (
              <Link to="/subordinates/add">
                <DashboardButton
                  titleEn={"Add a new Subordinate"}
                  titleAr={"اضافة مسؤول فرعي جديد"}
                  variant="add"
                />
              </Link>
            )
          : canCreatePermission && (
              <Link to="/subordinates/permissions/add">
                <DashboardButton
                  titleEn={"Add new permission"}
                  titleAr={"اضافة صلاحية جديدة "}
                  variant="add"
                />
              </Link>
            )}
      </div>
    </div>
  );
};

export default SubordinatesHeader;

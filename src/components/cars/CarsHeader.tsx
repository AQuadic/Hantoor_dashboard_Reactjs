import React from "react";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import { useHasPermission } from "@/hooks/usePermissions";
import CarsSelect from "./CarsSelect";
import { type VehicleFilters } from "@/api/vehicles";
import { RangeValue } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";

interface CarsHeaderProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  filters?: VehicleFilters;
  onFilterChange?: (newFilters: Partial<VehicleFilters>) => void;
  dateRange?: RangeValue<CalendarDate> | null;
  setDateRange?: (range: RangeValue<CalendarDate> | null) => void;
}

const CarsHeader = ({
  searchTerm,
  setSearchTerm,
  filters,
  onFilterChange,
  dateRange,
  setDateRange,
}: CarsHeaderProps) => {
  const canCreate = useHasPermission("create_vehicle");
  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="السيارات"
        titleEn="Cars"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "السيارات", titleEn: "Cars" },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={searchTerm || ""}
            termEn={searchTerm || ""}
            setTermAr={setSearchTerm || (() => {})}
            setTermEn={setSearchTerm || (() => {})}
            placeholderAr="ابحث باسم السيارة / اسم الوكيل"
            placeholderEn="Search by car name / agent name"
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker
            value={dateRange}
            onChange={(range) => {
              setDateRange?.(range);

              if (onFilterChange) {
                onFilterChange({
                  ...filters,
                  from_date: range?.start ? range.start.toString() : undefined,
                  to_date: range?.end ? range.end.toString() : undefined,
                });
              }
            }}
          />
        </div>
        {canCreate && (
          <Link to="/cars/add">
            <DashboardButton
              titleAr={"اضافة سيارة جديدة"}
              titleEn={"Add a new car"}
              variant="add"
            />
          </Link>
        )}
      </div>
      <CarsSelect filters={filters} onFilterChange={onFilterChange} />
    </div>
  );
};

export default CarsHeader;

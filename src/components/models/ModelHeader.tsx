import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import TabsFilter from "../general/dashboard/TabsFilter";
import { RangeValue } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import { usePermissions } from "@/hooks/usePermissions";
import { useMemo } from "react";

interface SubordinatesHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  dateRange?: RangeValue<CalendarDate> | null;
  setDateRange?: (range: RangeValue<CalendarDate> | null) => void;
}

const ModelHeader: React.FC<SubordinatesHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
  setSearch,
  dateRange,
  setDateRange,
}) => {
  const { hasPermission } = usePermissions();

  // Filter tabs based on user permissions
  const filtersData = useMemo(() => {
    const allFiltersData = [
      {
        titleAr: "الموديلات",
        titleEn: "Models",
        addTextAr: "اضافة موديل جديد",
        addTextEn: "Add New Model",
        link: "/models/add",
        permission: "view_vehicle_model",
      },
      {
        titleAr: "انواع الهيكل",
        titleEn: "Structure Types",
        addTextAr: "اضافة نوع هيكل جديد",
        addTextEn: "Add New Structure Type",
        link: "/structure-types/add",
        permission: "view_vehicle_class",
      },
      {
        titleAr: "انواع السيارة",
        titleEn: "Car Types",
        addTextAr: "اضافة نوع سيارة جديد",
        addTextEn: "Add New Car Type",
        link: "/car-types/add",
        permission: "view_vehicle_type",
      },
      {
        titleAr: "الفئات",
        titleEn: "Categories",
        addTextAr: "اضافة فئة جديدة",
        addTextEn: "Add New Category",
        link: "/categories/add",
        permission: "view_category",
      },
      {
        titleAr: "منشأ الماركة",
        titleEn: "Brand Origin",
        addTextAr: "اضافة منشأ ماركة جديد",
        addTextEn: "Add New Brand Origin",
        link: "/brand-origins/add",
        permission: "view_brand_origin",
      },
      {
        titleAr: "عدد المقاعد",
        titleEn: "Number of Seats",
        addTextAr: "اضافة عدد مقاعد جديد",
        addTextEn: "Add New Number of Seats",
        link: "/seat-numbers/add",
        permission: "view_seat_count",
      },
      {
        titleAr: "انواع الماكينة",
        titleEn: "Engine Types",
        addTextAr: "اضافة نوع ماكينة جديد",
        addTextEn: "Add New Engine Type",
        link: "/engine-types/add",
        permission: "view_engine_type",
      },
      {
        titleAr: "احجام الماكينة",
        titleEn: "Engine Sizes",
        addTextAr: "اضافة حجم ماكينة جديد",
        addTextEn: "Add New Engine Size",
        link: "/engine-sizes/add",
        permission: "view_engine_size",
      },
      {
        titleAr: "السعر من",
        titleEn: "Price From",
        addTextAr: "اضافة سعر من جديد",
        addTextEn: "Add New Price From",
        link: "/price-from/add",
        permission: "view_price_from",
      },
      {
        titleAr: "السعر الى",
        titleEn: "Price To",
        addTextAr: "اضافة سعر الى جديد",
        addTextEn: "Add New Price To",
        link: "/price-to/add",
        permission: "view_price_to",
      },
    ];

    return allFiltersData.filter((tab) => hasPermission(tab.permission));
  }, [hasPermission]);

  // Find current filter or default to first available if user doesn't have permission
  const currentFilter =
    filtersData.find((filter) => filter.titleEn === selectedFilter) ||
    filtersData[0];

  const getSearchPlaceholder = (filter: string) => {
    switch (filter) {
      case "Number of Seats":
        return { ar: "ابحث بالعدد", en: "Search by number" };
      case "Price From":
      case "Price To":
        return { ar: "ابحث بالسعر", en: "Search by price" };
      default:
        return { ar: "ابحث بالاسم", en: "Search by name" };
    }
  };
  const placeholder = getSearchPlaceholder(selectedFilter);


  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="اقسام السيارات"
        titleEn="Car Sections"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "اقسام السيارات", titleEn: "Car Sections" },
        ]}
      />

      <TabsFilter
        filters={filtersData}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
        <SearchBar
          termAr={""}
          termEn={""}
          setTermAr={setSearch}
          setTermEn={setSearch}
          placeholderAr={placeholder.ar}
          placeholderEn={placeholder.en}
        />

        </div>
        <div className="flex-1">
          <DashboardDatePicker value={dateRange} onChange={setDateRange} />
        </div>
        <Link to={currentFilter.link}>
          <DashboardButton
            titleAr={currentFilter.addTextAr}
            titleEn={currentFilter.addTextEn}
            variant="add"
          />
        </Link>
      </div>
    </div>
  );
};

export default ModelHeader;

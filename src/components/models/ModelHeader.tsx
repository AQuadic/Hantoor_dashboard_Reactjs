import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import TabsFilter from "../general/dashboard/TabsFilter";
import { Select, SelectItem, RangeValue } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import { usePermissions } from "@/hooks/usePermissions";
import { useEffect, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Country, getAllCountries } from "@/api/countries/getCountry";
import { useTranslation } from "react-i18next";

interface SubordinatesHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  dateRange?: RangeValue<CalendarDate> | null;
  setDateRange?: (range: RangeValue<CalendarDate> | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string | null>>;
}

const ModelHeader: React.FC<SubordinatesHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
  search,
  setSearch,
  dateRange,
  setDateRange,
  selectedCountry,
  setSelectedCountry,
}) => {
  const { t, i18n } = useTranslation("users");
  const { permissions } = usePermissions();

  const { data } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: () => getAllCountries(),
  });

  const countries: Country[] = Array.isArray(data) ? data : [];

  const selectItems = [
    { key: "all", label: t("all") },
    ...countries.map((c) => ({
      key: c.id.toString(),
      label: i18n.language === "ar" ? c.name.ar : c.name.en,
    })),
  ];

  // Filter tabs based on user permissions
  // Filter tabs based on user permissions
  type FilterItem = {
    titleAr: string;
    titleEn: string;
    addTextAr: string;
    addTextEn: string;
    link: string;
    permission?: string | string[]; // view permission(s)
    createPermission?: string | string[]; // create permission(s)
  };

  // Build a helper set of permission keys for matching related permissions
  const permissionKeys = useMemo(
    () => new Set(permissions.map((p) => p.key)),
    [permissions]
  );

  const actionPrefixes = useMemo(
    () =>
      new Set([
        "view",
        "create",
        "edit",
        "delete",
        "change-status",
        "change_status",
        "block",
        "link",
        "vehicle",
        "notes",
        "email",
        "star",
        "change-password",
        "vehicle_chat",
      ]),
    []
  );

  const trailingSuffixes = useMemo(() => new Set(["count", "dashboard"]), []);

  // Strict matching helper used by tabs and add button logic
  const permissionMatches = useCallback(
    (requiredPermission: string) => {
      const extractResource = (key: string) => {
        if (!key) return "";
        const parts = key.split("_");
        while (parts.length > 0 && actionPrefixes.has(parts[0])) {
          parts.shift();
        }
        while (parts.length > 0 && trailingSuffixes.has(parts.at(-1)!)) {
          parts.pop();
        }
        return parts.join("_");
      };

      if (permissionKeys.has(requiredPermission)) return true;
      const reqResource = extractResource(requiredPermission);
      if (!reqResource) return false;

      for (const k of permissionKeys) {
        if (k === requiredPermission) return true;
        const userResource = extractResource(k);
        if (userResource && userResource === reqResource) return true;
      }

      return false;
    },
    [permissionKeys, actionPrefixes, trailingSuffixes]
  );

  const filtersData = useMemo(() => {
    const allFiltersData: FilterItem[] = [
      {
        titleAr: "الموديلات",
        titleEn: "Models",
        addTextAr: "اضافة موديل جديد",
        addTextEn: "Add New Model",
        link: "/models/add",
        permission: "view_vehicle_model",
        createPermission: "create_vehicle_model",
      },
      {
        titleAr: "انواع الهيكل",
        titleEn: "Structure Types",
        addTextAr: "اضافة نوع هيكل جديد",
        addTextEn: "Add New Structure Type",
        link: "/structure-types/add",
        permission: ["view_vehicle_class", "view_vehicle_body_type"],
        // Structure Types add should be allowed when user can create vehicle body types
        createPermission: "create_vehicle_body_type",
      },
      {
        titleAr: "انواع السيارة",
        titleEn: "Car Types",
        addTextAr: "اضافة نوع سيارة جديد",
        addTextEn: "Add New Car Type",
        link: "/car-types/add",
        permission: "view_vehicle_type",
        createPermission: "create_vehicle_type",
      },
      {
        titleAr: "الفئات",
        titleEn: "Categories",
        addTextAr: "اضافة فئة جديدة",
        addTextEn: "Add New Category",
        link: "/categories/add",
        permission: ["view_category", "view_vehicle_class"],
        // Allow creation via either create_category or create_vehicle_class when appropriate
        createPermission: ["create_category", "create_vehicle_class"],
      },
      {
        titleAr: "منشأ الماركة",
        titleEn: "Brand Origin",
        addTextAr: "اضافة منشأ ماركة جديد",
        addTextEn: "Add New Brand Origin",
        link: "/brand-origins/add",
        permission: "view_brand_origin",
        createPermission: "create_brand_origin",
      },
      {
        titleAr: "عدد المقاعد",
        titleEn: "Number of Seats",
        addTextAr: "اضافة عدد مقاعد جديد",
        addTextEn: "Add New Number of Seats",
        link: "/seat-numbers/add",
        permission: "view_seat_count",
        createPermission: "create_seat_count",
      },
      {
        titleAr: "انواع الماكينة",
        titleEn: "Engine Types",
        addTextAr: "اضافة نوع ماكينة جديد",
        addTextEn: "Add New Engine Type",
        link: "/engine-types/add",
        permission: "view_engine_type",
        createPermission: "create_engine_type",
      },
      {
        titleAr: "احجام الماكينة",
        titleEn: "Engine Sizes",
        addTextAr: "اضافة حجم ماكينة جديد",
        addTextEn: "Add New Engine Size",
        link: "/engine-sizes/add",
        permission: "view_engine_size",
        createPermission: "create_engine_size",
      },
      {
        titleAr: "السعر من",
        titleEn: "Price From",
        addTextAr: "اضافة سعر من جديد",
        addTextEn: "Add New Price From",
        link: "/price-from/add",
        permission: "view_price_from",
        createPermission: "create_price_from",
      },
      {
        titleAr: "السعر الى",
        titleEn: "Price To",
        addTextAr: "اضافة سعر الى جديد",
        addTextEn: "Add New Price To",
        link: "/price-to/add",
        permission: "view_price_to",
        createPermission: "create_price_to",
      },
    ];

    return allFiltersData.filter((tab) => {
      const perm = tab.permission;
      if (!perm) return false;
      if (Array.isArray(perm)) {
        // If any of the listed permissions match user permissions, show the tab
        return perm.some((p) => permissionMatches(p));
      }
      return permissionMatches(perm);
    });
  }, [permissionMatches]);

  // Find current filter or default to first available if user doesn't have permission
  const currentFilter: FilterItem | undefined =
    filtersData.find((filter) => filter.titleEn === selectedFilter) ||
    filtersData[0];

  // Determine whether the Add button should be shown for the current tab.
  // We map view_* permission keys to create_* equivalents and check those.
  const showAddButton = useMemo(() => {
    if (!currentFilter) return false;
    const viewPerm = currentFilter.permission;
    const explicitCreate = currentFilter.createPermission;

    // If createPermission is explicitly provided, prefer it.
    if (explicitCreate) {
      if (Array.isArray(explicitCreate))
        return explicitCreate.some((p) => permissionMatches(p));
      return permissionMatches(explicitCreate);
    }

    if (!viewPerm) return false;
    if (Array.isArray(viewPerm)) {
      const createPerms = viewPerm.map((p) => p.replace(/^view_/, "create_"));
      return createPerms.some((p) => permissionMatches(p));
    }
    return permissionMatches(viewPerm.replace(/^view_/, "create_"));
  }, [currentFilter, permissionMatches]);

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

  useEffect(() => {
    // Always clear selected country when filter changes in this header.
    setSelectedCountry(null);
  }, [selectedFilter, setSelectedCountry]);

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
            termAr={search}
            termEn={search}
            setTermAr={setSearch}
            setTermEn={setSearch}
            placeholderAr={placeholder.ar}
            placeholderEn={placeholder.en}
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker value={dateRange} onChange={setDateRange} />
        </div>
        {showAddButton && (
          <Link to={currentFilter.link}>
            <DashboardButton
              titleAr={currentFilter.addTextAr}
              titleEn={currentFilter.addTextEn}
              variant="add"
            />
          </Link>
        )}
      </div>

      {(selectedFilter === "Price From" || selectedFilter === "Price To") && (
        <div className="w-[160px] mt-3 md:mx-8 mx-0">
          <Select
            items={selectItems}
            label={t("country")}
            placeholder={t("all")}
            selectedKeys={selectedCountry ? [selectedCountry] : ["all"]}
            onSelectionChange={(selection) => {
              const key = [...selection][0];
              setSelectedCountry(key === "all" ? null : String(key));
            }}
          >
            {(country) => (
              <SelectItem key={country.key}>{country.label}</SelectItem>
            )}
          </Select>
        </div>
      )}
    </div>
  );
};

export default ModelHeader;

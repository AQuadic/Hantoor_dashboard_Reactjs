import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import TabsFilter from "../general/dashboard/TabsFilter";
import { Select, SelectItem, RangeValue } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { CalendarDate } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";
import { Country, getAllCountries } from "@/api/countries/getCountry";
import { useState } from "react";

interface ModelHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  dateRange?: RangeValue<CalendarDate> | null;
  setDateRange?: (range: RangeValue<CalendarDate> | null) => void;

  selectedCountry: string | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string | null>>;
}

const ModelHeader: React.FC<ModelHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
  search,
  setSearch,
  dateRange,
  setDateRange,
}) => {
  const { t, i18n } = useTranslation("users");
  const [, setSelectedCountry] = useState<string | null>(null);

  const { data } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: () => getAllCountries(),
  });

  const countries: Country[] = Array.isArray(data) ? data : [];

  const selectItems = countries.map((c) => ({
    key: c.id.toString(),
    label: i18n.language === "ar" ? c.name.ar : c.name.en,
  }));

   const filtersData = [
    {
      titleAr: "الموديلات",
      titleEn: "Models",
      addTextAr: "اضافة موديل جديد",
      addTextEn: "Add New Model",
      link: "/models/add",
    },
    {
      titleAr: "انواع الهيكل",
      titleEn: "Structure Types",
      addTextAr: "اضافة نوع هيكل جديد",
      addTextEn: "Add New Structure Type",
      link: "/structure-types/add",
    },
    {
      titleAr: "انواع السيارة",
      titleEn: "Car Types",
      addTextAr: "اضافة نوع سيارة جديد",
      addTextEn: "Add New Car Type",
      link: "/car-types/add",
    },
    {
      titleAr: "الفئات",
      titleEn: "Categories",
      addTextAr: "اضافة فئة جديدة",
      addTextEn: "Add New Category",
      link: "/categories/add",
    },
    {
      titleAr: "منشأ الماركة",
      titleEn: "Brand Origin",
      addTextAr: "اضافة منشأ ماركة جديد",
      addTextEn: "Add New Brand Origin",
      link: "/brand-origins/add",
    },
    {
      titleAr: "عدد المقاعد",
      titleEn: "Number of Seats",
      addTextAr: "اضافة عدد مقاعد جديد",
      addTextEn: "Add New Number of Seats",
      link: "/seat-numbers/add",
    },
    {
      titleAr: "انواع الماكينة",
      titleEn: "Engine Types",
      addTextAr: "اضافة نوع ماكينة جديد",
      addTextEn: "Add New Engine Type",
      link: "/engine-types/add",
    },
    {
      titleAr: "احجام الماكينة",
      titleEn: "Engine Sizes",
      addTextAr: "اضافة حجم ماكينة جديد",
      addTextEn: "Add New Engine Size",
      link: "/engine-sizes/add",
    },
    {
      titleAr: "السعر من",
      titleEn: "Price From",
      addTextAr: "اضافة سعر من جديد",
      addTextEn: "Add New Price From",
      link: "/price-from/add",
    },
    {
      titleAr: "السعر الى",
      titleEn: "Price To",
      addTextAr: "اضافة سعر الى جديد",
      addTextEn: "Add New Price To",
      link: "/price-to/add",
    },
  ];

  const currentFilter =
    filtersData.find((filter) => filter.titleEn === selectedFilter) ||
    filtersData[0];

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
            placeholderAr="ابحث بالاسم"
            placeholderEn="Search by name"
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

      {(selectedFilter === "Price From" || selectedFilter === "Price To") && (
        <div className="w-[160px] mt-3 md:mx-8 mx-0">
          <Select
            items={selectItems}
            label={t("country")}
            placeholder={t("all")}
            classNames={{
              trigger: "h-[46px] !h-[46px] min-h-[46px] bg-white border !py-6",
              label: "text-sm text-gray-700",
              listbox: "bg-white shadow-md",
            }}
            onSelectionChange={(selection) => {
              const key = [...selection][0];
              setSelectedCountry(key !== undefined ? key.toString() : null);
            }}
          >
            {(country) => <SelectItem key={country.key}>{country.label}</SelectItem>}
          </Select>
        </div>
      )}
    </div>
  );
};

export default ModelHeader;

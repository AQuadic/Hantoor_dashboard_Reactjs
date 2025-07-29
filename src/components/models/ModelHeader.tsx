import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import TabsFilter from "../general/dashboard/TabsFilter";

interface SubordinatesHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const ModelHeader: React.FC<SubordinatesHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const filtersData = [
    {
      titleAr: "الموديلات",
      titleEn: "Models",
      addText: "اضافة موديل جديد",
      link: "/models/add",
    },
    {
      titleAr: "انواع الهيكل",
      titleEn: "Structure Types",
      addText: "اضافة نوع هيكل جديد",
      link: "/structure-types/add",
    },
    {
      titleAr: "انواع السيارة",
      titleEn: "Car Types",
      addText: "اضافة نوع سيارة جديد",
      link: "/car-types/add",
    },
    {
      titleAr: "الفئات",
      titleEn: "Categories",
      addText: "اضافة فئة جديدة",
      link: "/categories/add",
    },
    {
      titleAr: "منشأ الماركة",
      titleEn: "Brand Origin",
      addText: "اضافة منشأ ماركة جديد",
      link: "/brand-origins/add",
    },
    {
      titleAr: "عدد المقاعد",
      titleEn: "Number of Seats",
      addText: "اضافة عدد مقاعد جديد",
      link: "/seat-numbers/add",
    },
    {
      titleAr: "انواع الماكينة",
      titleEn: "Engine Types",
      addText: "اضافة نوع ماكينة جديد",
      link: "/engine-types/add",
    },
    {
      titleAr: "احجام الماكينة",
      titleEn: "Engine Sizes",
      addText: "اضافة حجم ماكينة جديد",
      link: "/engine-sizes/add",
    },
    {
      titleAr: "السعر من",
      titleEn: "Price From",
      addText: "اضافة سعر من جديد",
      link: "/price-from/add",
    },
    {
      titleAr: "السعر الى",
      titleEn: "Price To",
      addText: "اضافة سعر الى جديد",
      link: "/price-to/add",
    },
  ];

  // Get the current filter data
  const currentFilter =
    filtersData.find((filter) => filter.titleEn === selectedFilter) ||
    filtersData[0];

  return (
    <div className="pt-2 pb-6 bg-white">
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
          <SearchBar term={"ابحث بالاسم"} setTerm={() => {}} />
        </div>
        <div className="flex-1">
          <DashboardDatePicker />
        </div>
        <Link to={currentFilter.link}>
          <DashboardButton title={currentFilter.addText} variant="add" />
        </Link>
      </div>
    </div>
  );
};

export default ModelHeader;

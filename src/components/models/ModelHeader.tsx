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


  // Get the current filter data
  const currentFilter =
    filtersData.find((filter) => filter.titleEn === selectedFilter) ||
    filtersData[0];

  return (
    <div className="pt-2 pb-6 bg-white border-b border-[#E1E1E1]">
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
            termAr={"ابحث بالاسم"}
            termEn={"Search by name"}
            setTermAr={() => {}} 
            setTermEn={() => {}} 
            />
        </div>
        <div className="flex-1">
          <DashboardDatePicker />
        </div>
        <Link to={currentFilter.link}>
          <DashboardButton titleAr={currentFilter.addTextAr} titleEn={currentFilter.addTextEn} variant="add" />
        </Link>
      </div>
    </div>
  );
};

export default ModelHeader;

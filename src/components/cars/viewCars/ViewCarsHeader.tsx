import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import TabsFilter from "@/components/general/dashboard/TabsFilter";

interface SubordinatesHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const ViewCarsHeader: React.FC<SubordinatesHeaderProps> = ({
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
    <div className="pt-2  bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="تفاصيل السيارة"
        titleEn="Car details"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "السيارات", titleEn: "Cars" },
          { titleAr: "تفاصيل السيارة", titleEn: "Car details" },
        ]}
      />
      <div className="px-9 bg-white mb-4">
        <div className="flex gap-4 ">
          <img
            width={338}
            height={175}
            className="object-cover w-[338px] h-[175px] rounded-xl"
            src="/public/images/carDetails.png"
          />
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">تويوتا كامري 2025</h3>
            <div className="flex items-center gap-2">
              <img
                className="w-[35px] h-[25px]"
                src="/public/images/toyota.png"
                alt="Toyota Logo"
              />
              <p className="text-lg text-[#606060]">تويوتا</p>
            </div>
            <p className="text-xl font-bold text-primary">500.000 درهم</p>
            <p className="text-lg text-[#606060] line-through">600.200 درهم</p>
          </div>
        </div>
      </div>

      <TabsFilter
        filters={filtersData}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </div>
  );
};

export default ViewCarsHeader;

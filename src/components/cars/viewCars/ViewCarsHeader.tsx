import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import DiscountPercentage from "./DiscountPercentage";

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
      titleAr: "عن السيارة",
      titleEn: "About Car",
    },
    {
      titleAr: "المواصفات",
      titleEn: "Specifications",
    },
    {
      titleAr: "باقات الصيانة",
      titleEn: "Maintenance Packages",
    },
    {
      titleAr: "الاكسسوارات",
      titleEn: "Accessories",
    },
    {
      titleAr: "العروض",
      titleEn: "Offers",
    },
    {
      titleAr: "إيجار منتهي بالتمليك",
      titleEn: "Lease to Own",
    },
    {
      titleAr: "الصور الاضافية",
      titleEn: "Additional Images",
    },
    {
      titleAr: "الفيديوهات",
      titleEn: "Videos",
    },
    {
      titleAr: "الصور الاعلانية",
      titleEn: "Ad Images",
    },
  ];

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
      <div className="px-9 bg-white mb-4 flex justify-between">
        <div className="flex gap-4 ">
          <img
            width={338}
            height={175}
            className="object-cover w-[338px] h-[175px] rounded-xl"
            src="/public/images/carDetails.png"
          />
          <div className="flex flex-col gap-1.5">
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
            <DiscountPercentage percentage={15} />
          </div>
        </div>
        <div>
          <div className="flex flex-col p-4 border rounded-2xl ">
            <p className="text-2xl text-primary font-bold">10</p>
            <p className="text-sm text-[#64748B]">عدد مرات الإضافة للمفضلة</p>
          </div>
          <div className="flex flex-col p-4 border rounded-2xl mt-1.5">
            <p className="text-2xl text-primary font-bold">21</p>
            <p className="text-sm text-[#64748B]">عدد المشاهدات</p>
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

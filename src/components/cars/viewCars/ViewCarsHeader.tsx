import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import { Vehicle } from "@/api/vehicles/getVehicleById";
import { useTranslation } from "react-i18next";

interface ViewCarsHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  vehicle?: Vehicle;
}

const ViewCarsHeader: React.FC<ViewCarsHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
  vehicle,
}) => {
  const { t, i18n } = useTranslation('cars');
  const getdispbByLang = (name?: { ar?: string; en?: string }) => {
  if (!name) return "undefined";
  const lang = i18n.language as 'ar' | 'en';
  return name[lang] || name.ar || name.en || "undefined";
};

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
            src={vehicle?.image || vehicle?.additional_images?.[0] || "/images/carDetails.png"}
            alt="Vehicle"
          />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl font-bold">
              {getdispbByLang(vehicle?.name)}
            </h3>
            <div className="flex items-center gap-2">
              {vehicle?.brand?.image?.url && (
                <img
                  className="w-[35px] h-[25px] object-contain"
                  src={vehicle.brand.image.url}
                  alt={`${getdispbByLang(vehicle?.brand?.name)} Logo`}
                />
              )}
              <p className="text-lg text-[#606060]">{getdispbByLang(vehicle?.brand?.name)}</p>
            </div>
            <p className="text-xl font-bold text-primary">
              {vehicle?.price ? `${vehicle.price} درهم` : "0 درهم"}
            </p>

            {/* {(vehicle?.vehicle_model?.name || vehicle?.vehicle_type?.name || vehicle?.vehicle_class?.name) && (
              <div className="flex gap-4 mt-2 text-sm text-[#606060]">
                {vehicle?.vehicle_model?.name && (
                  <div>
                    <span>الموديل: </span>
                    <span className="font-medium">{getdispbByLang(vehicle.vehicle_model.name)}</span>
                  </div>
                )}
                {vehicle?.vehicle_type?.name && (
                  <div>
                    <span>النوع: </span>
                    <span className="font-medium">{getdispbByLang(vehicle.vehicle_type.name)}</span>
                  </div>
                )}
                {vehicle?.vehicle_class?.name && (
                  <div>
                    <span>الفئة: </span>
                    <span className="font-medium">{getdispbByLang(vehicle.vehicle_class.name)}</span>
                  </div>
                )}
              </div>
            )} */}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col p-4 border rounded-2xl">
            <p className="text-2xl text-primary font-bold">{vehicle?.favorites || 0}</p>
            <p className="text-sm text-[#64748B]">{t('favTimes')}</p>
          </div>
          <div className="flex flex-col p-4 border rounded-2xl mt-1.5">
            <p className="text-2xl text-primary font-bold">{vehicle?.views || 0}</p>
            <p className="text-sm text-[#64748B]">{t('views')}</p>
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

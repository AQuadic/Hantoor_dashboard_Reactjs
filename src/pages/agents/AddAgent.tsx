import AddMaintenanceCenter from "@/components/agents/AddMaintenanceCenter";
import AddSalesShowrooms from "@/components/agents/AddSalesShowrooms";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Brand, BrandsApiResponse, fetchBrands } from "@/api/brand/fetchBrands";

interface SubordinatesHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const AddAgent: React.FC<SubordinatesHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const { t } = useTranslation("agents");
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [emailLink, setEmailLink] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");

  const page = 1;
  const { data: brands } = useQuery<BrandsApiResponse>({
    queryKey: ["brands", page],
    queryFn: ({ queryKey }) => fetchBrands(queryKey[1] as number),
  });

  const selectedBrand = brands?.data.find(
    (brand: Brand) => brand.id === Number(selectedBrandId)
  );

  return (
    <section>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="اضافة وكيل جديد"
          titleEn="Add new agent"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الوكلاء", titleEn: "Agents", link: "/agents" },
            { titleAr: "اضافة وكيل جديد", titleEn: "Add new agent", link: "/" },
          ]}
        />
      </div>
      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic name */}
          <div className="relative w-full">
            <DashboardInput
              label={t("arName")}
              value={arName}
              onChange={setArName}
              placeholder="الشركة الدولية التجارية"
            />
          </div>
          {/* English name */}
          <div className="relative w-full">
            <DashboardInput
              label={t("enName")}
              value={enName}
              onChange={setEnName}
              placeholder={t("writeHere")}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Link */}
          <div className="relative w-full">
            <DashboardInput
              label={t("emailLink")}
              value={emailLink}
              onChange={setEmailLink}
              placeholder={t("writeHere")}
            />
          </div>

          <div className="relative w-full border border-gray-300 rounded-lg p-3 text-sm">
            <p className="text-right text-black text-sm">{t("brand")}</p>
            <div className="flex items-center justify-between gap-1">
              <span className="text-gray-500 text-sm">
                {selectedBrand?.name?.ar || t("selectBrand")}
              </span>

              <select
                className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer"
                value={selectedBrandId}
                onChange={(e) => setSelectedBrandId(e.target.value)}
              >
                <option value="">{t("selectBrand")}</option>
                {brands?.data?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name.ar}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr className="my-[11px]" />

        <TabsFilter
          filters={[
            {
              titleAr: "اضافة مراكز الصيانة",
              titleEn: "Add maintenance centers",
            },
            {
              titleAr: "اضافة معارض البيع",
              titleEn: "Add sales Showrooms",
            },
          ]}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        {selectedFilter === "Add maintenance centers" && (
          <AddMaintenanceCenter />
        )}

        {selectedFilter === "Add sales Showrooms" && <AddSalesShowrooms />}
      </div>
    </section>
  );
};

export default AddAgent;

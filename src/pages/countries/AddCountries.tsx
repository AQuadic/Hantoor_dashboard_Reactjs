import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AddCountries = () => {
  const { t } = useTranslation("country");
  const [arCountry, setArCountry] = useState("");
  const [enCountry, setEnCountry] = useState("");
  const [arCurrency, setArCurrency] = useState("");
  const [enCurrency, setEnCurrency] = useState("");
  const [tax, setTax] = useState("");
  return (
    <section>
      <DashboardHeader
        titleAr="اضافة بلد جديدة"
        titleEn="Add new country"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "البلاد", titleEn: "Countries", link: "/countries" },
          { titleAr: "اضافة بلد جديدة", titleEn: "Add new country" },
        ]}
      />

      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic country */}
          <div className="relative w-full ">
            <DashboardInput
              label={t("arCountry")}
              value={arCountry}
              onChange={setArCountry}
              placeholder="الامارات"
            />
          </div>
          {/* English country */}
          <div className="relative w-full">
            <DashboardInput
              label={t("enCountry")}
              value={enCountry}
              onChange={setEnCountry}
              placeholder={t("writeHere")}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic currency */}
          <div className="relative w-full">
            <DashboardInput
              label={t("arCurrency")}
              value={arCurrency}
              onChange={setArCurrency}
              placeholder="درهم اماراتي"
            />
          </div>
          {/* English currency */}
          <div className="relative w-full">
            <DashboardInput
              label={t("enCurrency")}
              value={enCurrency}
              onChange={setEnCurrency}
              placeholder={t("writeHere")}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          <div className="relative w-full">
            <DashboardInput
              label={t("tax")}
              value={tax}
              onChange={setTax}
              placeholder="20 درهم"
            />
          </div>
          <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
            <p className="text-right text-black text-sm">{t("time")}</p>
            <div className="flex items-center justify-between gap-1">
              <span className="text-gray-500 text-sm">3</span>
              <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                <option value="شهر">{t("month")}</option>
                <option value="أيام">{t("day")}</option>
                <option value="سنوات">{t("year")}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <DashboardButton titleAr={"اضافة"} titleEn={"Add"} />
        </div>
      </div>
    </section>
  );
};

export default AddCountries;

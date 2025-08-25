// src/pages/countries/EditCountries.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";

import { getCountryById, Country } from "@/api/countries/getCountryById";
import Loading from "@/components/general/Loading";
import { updateCountry } from "@/api/countries/editCountry";

const EditCountries = () => {
  const { t } = useTranslation("country");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [country, setCountry] = useState<Country | null>(null);
  const [arCountry, setArCountry] = useState("");
  const [enCountry, setEnCountry] = useState("");
  const [code, setCode] = useState("");
  const [arCurrency, setArCurrency] = useState("");
  const [enCurrency, setEnCurrency] = useState("");
  const [tax, setTax] = useState("");
  const [timeType, setTimeType] = useState<"month" | "day" | "year">("month");
  const [loading, setLoading] = useState(false);

  if (!country) {
    getCountryById(Number(id))
      .then((res) => {
        setCountry(res);
        setArCountry(res.name.ar);
        setEnCountry(res.name.en);
        setCode(res.code || "");
        setArCurrency(res.currency?.ar || "");
        setEnCurrency(res.currency?.en || "");
        setTax(res.tax || "");
        setTimeType((res.time_type as any) || "month");
      })
      .catch((err) => {
        console.error("Failed to fetch country:", err);
        toast.error(t("failedToLoad"));
      });
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateCountry(Number(id), {
        name: { ar: arCountry, en: enCountry },
        code,
        currency: { ar: arCurrency, en: enCurrency },
        tax,
        time_type: timeType,
        is_active: true,
      });
      toast.success(t("countryUpdatedSuccessfully"));
      navigate("/countries");
    } catch (error: any) {
      console.error("Failed to update country:", error);
      const message =
        error?.response?.data?.message || error?.message || t("failedToUpdate");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!country) return <Loading />;

  return (
    <section>
      <DashboardHeader
        titleAr="تعديل البلد"
        titleEn="Edit country"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "البلاد", titleEn: "Countries", link: "/countries" },
          { titleAr: "تعديل البلد", titleEn: "Edit country" },
        ]}
      />

      <div className=" bg-white mt-3 rounded-[15px] py-[19px] md:px-[29px] px-2 md:mx-8 mx-2">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic country */}
          <div className="relative w-full">
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
              <select
                className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer"
                value={timeType}
                onChange={(e) => setTimeType(e.target.value as any)}
              >
                <option value="month">{t("month")}</option>
                <option value="day">{t("day")}</option>
                <option value="year">{t("year")}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="relative w-full mt-4">
          <DashboardInput
            label={t("countryCode")}
            value={code}
            onChange={setCode}
            placeholder="EG"
          />
        </div>

        <div className="mt-4">
          <DashboardButton
            titleAr={loading ? "جاري الحفظ..." : "حفظ"}
            titleEn={loading ? "Saving..." : "Save"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default EditCountries;

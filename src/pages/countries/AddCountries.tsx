import toast from "react-hot-toast";
import { storeCountry } from "@/api/countries/addCountry";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AddCountries = () => {
  const { t } = useTranslation("country");
  const [arCountry, setArCountry] = useState("");
  const [enCountry, setEnCountry] = useState("");
  const [code, setCode] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [arCurrency, setArCurrency] = useState("");
  const [enCurrency, setEnCurrency] = useState("");
  const [tax, setTax] = useState("");
  const [timeType, setTimeType] = useState<"month" | "day" | "year">("month");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await storeCountry({
        name: { ar: arCountry, en: enCountry },
        code,
        currency_text: { ar: arCurrency, en: enCurrency },
        currency_code: currencyCode,
        tax,
        time_type: timeType,
        is_active: true,
      });

      toast.success(t("countryAddedSuccessfully"));
      navigate("/countries");
      setArCountry("");
      setEnCountry("");
      setCode("");
      setArCurrency("");
      setEnCurrency("");
      setCurrencyCode("");
      setTax("");
      setTimeType("month");
    } catch (error: unknown) {
      console.error("Failed to create country:", error);

      let message = t("failedToAdd");
      if (error && typeof error === "object") {
        const e = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        message = e.response?.data?.message || e.message || message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

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

      <div className=" bg-white mt-3 rounded-[15px] py-[19px] md:px-[29px] px-2 md:mx-8 mx-2">
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
              <select
                className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer"
                value={timeType}
                onChange={(e) =>
                  setTimeType(e.target.value as "month" | "day" | "year")
                }
              >
                <option value="month">{t("month")}</option>
                <option value="day">{t("day")}</option>
                <option value="year">{t("year")}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
        <div className="relative w-full">
          <DashboardInput
            label={t("countryCode")}
            value={code}
            onChange={setCode}
            placeholder="EG"
          />
        </div>
        <div className="relative w-full">
          <DashboardInput
            label={t("currencyCode")}
            value={currencyCode}
            onChange={setCurrencyCode}
            placeholder="AED"
          />
        </div>
        </div>

        <div className="mt-4">
          <DashboardButton
            titleAr={loading ? "جاري الاضافة..." : "اضافة"}
            titleEn={loading ? "Adding..." : "Add"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default AddCountries;

import { useState, useEffect } from "react";
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
    const [currencyCode, setCurrencyCode] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [serviceDuration, setServiceDuration] = useState("3");
  const [serviceDurationType, setServiceDurationType] = useState<
    "month" | "day" | "year"
  >("month");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCountryById(Number(id))
      .then((res) => {
        setCountry(res);
        setArCountry(res.name.ar);
        setEnCountry(res.name.en);
        setCode(res.code || "");
        setArCurrency(res.currency_text?.ar || "");
        setEnCurrency(res.currency_text?.en || "");
        setCurrencyCode(res.currency || "");
        setServiceFee(res.service_fee?.toString() || "");
        setServiceDuration(res.service_duration || "3");
        setServiceDurationType((res.service_duration_type as any) || "month");
      })
      .catch((err) => {
        console.error("Failed to fetch country:", err);
        toast.error(t("failedToLoad"));
      });
  }, [id, t]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const originalCurrency = country?.currency || "";
      const cleanCurrency = currencyCode.trim().toUpperCase().slice(0, 3);

      const payload: any = {
        name: { ar: arCountry, en: enCountry },
        currency_text: { ar: arCurrency.trim(), en: enCurrency.trim() },
        service_fee: serviceFee,
        service_duration: serviceDuration,
        service_duration_type: serviceDurationType,
        is_active: true,
      };

      if (code.trim().toUpperCase() !== (country?.code || "").toUpperCase()) {
        payload.code = code.trim().toUpperCase();
      }

      if (cleanCurrency !== originalCurrency.toUpperCase()) {
        payload.currency = cleanCurrency;
      }

      await updateCountry(Number(id), payload);

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
              placeholder={t("writeHere")}
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
              placeholder={t("writeHere")}
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
              value={serviceFee}
              onChange={setServiceFee}
              placeholder="20 درهم"
            />
          </div>
          <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
            <p className="rtl:text-right text-black text-sm">{t("time")}</p>
            <div className="flex items-center justify-between gap-1">
              <input
                type="number"
                value={serviceDuration}
                onChange={(e) => setServiceDuration(e.target.value)}
                className="w-10 text-black text-sm text-center"
              />
              <select
                className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer"
                value={serviceDurationType}
                onChange={(e) =>
                  setServiceDurationType(
                    e.target.value as "month" | "day" | "year"
                  )
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
        <div className="relative w-full mt-4">
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
            placeholder={t("AED")}
          />
        </div>
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
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getCountries, Country } from "@/api/countries/getCountry";
import { getRequestFinancing, FinancingItem } from "@/api/financing/fetchFinancing";
import { createRequestFinancing, CreateRequestFinancingParams } from "@/api/financing/addFinancing";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const AddWhatsappNumber = () => {
  const { t, i18n } = useTranslation("setting");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const loadingRef = useRef(false);
  const navigate = useNavigate();

  // Fetch all countries using the standard countries endpoint
  const {
    data: countriesData,
    isLoading: isLoadingCountries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(1, ""),
  });

  // Fetch existing request-financing items (to hide countries that already have entries)
  const { data: requestFinancingData, isLoading: isLoadingFinancing } = useQuery({
    queryKey: ["request-financing-list"],
    queryFn: () => getRequestFinancing(undefined, false),
  });

  const countries: Country[] = countriesData?.data ?? [];
  const financingItems: FinancingItem[] = requestFinancingData ?? [];

  // Build a set of country ids that already have request-financing entries
  const financedCountryIds = new Set<number>(
    financingItems.map((f) => Number(f.country_id))
  );

  // Filter out countries that already have a financing request
  const availableCountries = countries.filter((c) => !financedCountryIds.has(c.id));

  const handleSubmit = async () => {
    if (!selectedCountry) {
      toast.error(t("pleaseSelectCountry"));
      return;
    }
    if (!phone) {
      toast.error(t("pleaseEnterPhone"));
      return;
    }

    const payload: CreateRequestFinancingParams = {
      phone: phone,
      country_id: Number(selectedCountry),
      is_active: true,
    };

    try {
      loadingRef.current = true;
      await createRequestFinancing(payload);

      toast.success(t("PhoneAddedSuccessfully"));
      setPhone("");
      setSelectedCountry(null);
      navigate("/settings?section=Insurance+Price+Request+Button");
    } catch (err: unknown) {
      // Narrow unknown error to read potential API message safely
      let apiMessage: string | undefined;
      if (typeof err === "object" && err !== null) {
        const e = err as Record<string, unknown>;
        const resp = e["response"] as Record<string, unknown> | undefined;
        apiMessage = (resp?.["data"] as Record<string, unknown> | undefined)?.["message"] as string | undefined;
        apiMessage = apiMessage ?? (e["message"] as string | undefined);
      } else if (typeof err === "string") {
        apiMessage = err;
      }

      let errorMessage = t("somethingWentWrong");
      if (apiMessage === "Request Financing already exists with this country.") {
        errorMessage = t("requestFinancingExists");
      }

      toast.error(errorMessage);
    }
    finally {
      loadingRef.current = false;
    }
  };

  return (
    <section>
      <div className=" bg-white ">
        <DashboardHeader
          titleAr="اضافة رقم واتساب جديد"
          titleEn="Add a new WhatsApp number"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
            {
              titleAr: "اضافة رقم واتساب جديد",
              titleEn: "Add a new WhatsApp number",
            },
          ]}
        />
      </div>
      <div className="bg-white mx-8 rounded-[15px] mt-[14px] px-7 py-[19px]">
        <div className="flex gap-[15px] mb-3">
          <div className="w-full">
            <Select
              items={availableCountries}
              label={t("country")}
              placeholder={t("selectCountry")}
              classNames={{
                trigger: "!h-[57px] bg-white border py-7.5",
                label: "text-sm text-gray-700",
                listbox: "bg-white shadow-md",
              }}
              isLoading={isLoadingCountries || isLoadingFinancing}
              selectedKeys={selectedCountry ? [selectedCountry] : []}
              onSelectionChange={(keys) =>
                setSelectedCountry(Array.from(keys)[0] as string)
              }
            >
              {(country) => (
                <SelectItem key={country.id}>
                  {i18n.language === "ar" ? country.name.ar : country.name.en}
                </SelectItem>
              )}
            </Select>
          </div>
          <div className="w-full">
            <DashboardInput
              label={t("whatsappNumber")}
              value={phone}
              onChange={(val: string) => {
                const numericValue = val.replace(/\D/g, "");
                setPhone(numericValue);
              }}
              placeholder={t("writeHere")}
            />
          </div>
        </div>
        <DashboardButton
          titleAr="اضافة"
          titleEn="Add"
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
};

export default AddWhatsappNumber;

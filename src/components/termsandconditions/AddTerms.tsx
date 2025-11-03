import React, { useState } from "react";
import { Input } from "@heroui/react";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { useTranslation } from "react-i18next";
import DashboardTextEditor from "../general/DashboardTextEditor";
import { addPage, RequestBody } from "@/api/pages/addPage";
import { getAllCountries, Country } from "@/api/countries/getCountry";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddTerms = () => {
  const { t } = useTranslation("setting");
  const [arBody, setArBody] = useState("");
  const [enBody, setEnBody] = useState("");
  const [arTitle, setArTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [isActive] = useState(false);
  const [orderColumn] = useState<number | undefined>(undefined);
  const [countryId, setCountryId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const {
    data: countriesResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getAllCountries("", true),
  });
  const countries: Country[] = countriesResponse || [];

  const handleSubmit = async () => {
    const data: RequestBody = {
      is_active: isActive,
      order_column: orderColumn,
      title: {
        ar: arTitle || undefined,
        en: enTitle,
      },
      description: {
        ar: arBody || undefined,
        en: enBody,
      },
      country_id: countryId,
    };

    try {
      const response = await addPage(data);
      toast.success(t("pageAddedSuccsessfully"));
      navigate("/settings?section=Terms+and+Conditions");
      console.log("API Response:", response);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="اضافة شروط واحكام جديدة"
          titleEn="Add a new terms and conditions"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
            {
              titleAr: "اضافة شروط واحكام جديدة",
              titleEn: "Add a new terms and conditions",
            },
          ]}
        />
      </div>
      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Country */}
          <div className="md:w-1/2 w-full">
            <Select onValueChange={(val) => setCountryId(Number(val))}>
              <SelectTrigger
                className="w-full !h-16 rounded-[12px] mt-4"
                dir="rtl"
              >
                <SelectValue placeholder={t("country")} />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {isLoading && (
                  <SelectItem value="-1" disabled>
                    {t("loading")}
                  </SelectItem>
                )}
                {isError && (
                  <SelectItem value="-1" disabled>
                    {t("errorLoading")}
                  </SelectItem>
                )}
                {!isLoading &&
                  !isError &&
                  countries.map((country) => (
                    <SelectItem key={country.id} value={country.id.toString()}>
                      {country.name.ar}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic Question */}
          <div className="relative w-full">
            <Input
              label={t("arText")}
              variant="bordered"
              placeholder={t("pricingPolicy")}
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              value={arTitle}
              onChange={(e) => setArTitle(e.target.value)}
            />
          </div>
          {/* English Question */}
          <div className="relative w-full">
            <Input
              label={t("enText")}
              variant="bordered"
              placeholder={t("pricingPolicy")}
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              value={enTitle}
              onChange={(e) => setEnTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic Question */}
          <div className="relative w-full">
            <DashboardTextEditor
              title={t("arDetails")}
              body={arBody}
              setBody={setArBody}
            />
          </div>
          {/* English Question */}
          <div className="relative w-full">
            <DashboardTextEditor
              title={t("enDetails")}
              body={enBody}
              setBody={setEnBody}
            />
          </div>
        </div>

        <div className="mt-4">
          <DashboardButton
            titleAr="اضافة"
            titleEn="Add"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTerms;

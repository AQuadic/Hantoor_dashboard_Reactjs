import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { useQuery } from "@tanstack/react-query";
import { getPage, PageDetail } from "@/api/pages/getPageById";
import { getAllCountries, Country } from "@/api/countries/getCountry";
import { updatePage, UpdatePageRequestBody } from "@/api/pages/updateTerms";
import toast from "react-hot-toast";
import Loading from "../general/Loading";

const EditTerms = () => {
  const { t, i18n } = useTranslation("setting");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [arTitle, setArTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [arDescription, setArDescription] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [countryId, setCountryId] = useState<number | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);
  const [orderColumn, setOrderColumn] = useState<number | undefined>(undefined);

  const { data: pageData, isLoading: isPageLoading } = useQuery({
    queryKey: ["page", id],
    queryFn: () => getPage(id!),
    enabled: !!id,
  });

  const { data: countriesData } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getAllCountries("", true),
  });
  const countries: Country[] = countriesData || [];

  useEffect(() => {
    if (pageData?.data) {
      const page: PageDetail = pageData.data;
      setArTitle(page.title.ar || "");
      setEnTitle(page.title.en || "");
      setArDescription(page.description?.ar || "");
      setEnDescription(page.description?.en || "");
      setCountryId(page.country_id);
      setIsActive(page.is_active);
      setOrderColumn(page.order_column);
    }
  }, [pageData]);

  if (isPageLoading) return <Loading />;

  const handleSave = async () => {
    const body: UpdatePageRequestBody = {
      is_active: isActive,
      order_column: orderColumn,
      title: { ar: arTitle, en: enTitle },
      description: { ar: arDescription, en: enDescription },
    };

    try {
      await updatePage(id!, body);
      toast.success(t("pageUpdatedSuccessfully"));
      navigate("/settings?section=Terms+and+Conditions");
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("errorUpdatingPage"));
      console.error("Update Page Error:", error);
    }
  };

  return (
    <div>
      <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
          titleAr="تعديل الشروط والاحكام"
          titleEn="Edit terms and conditions"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
            {
              titleAr: "تعديل الشروط والاحكام",
              titleEn: "Edit terms and conditions",
            },
          ]}
        />
      </div>
      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Country */}
          <div className="md:w-1/2 w-full">
            <Select
              onValueChange={(val) => setCountryId(Number(val))}
              value={countryId?.toString()}
            >
              <SelectTrigger
                className="w-full !h-16 rounded-[12px] mt-4"
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
              >
                <SelectValue placeholder={t("country")} />
              </SelectTrigger>
              <SelectContent dir={i18n.language === "ar" ? "rtl" : "ltr"}>
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id.toString()}>
                    {i18n.language === "ar" ? country.name.ar : country.name.en}
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
              body={arDescription}
              setBody={setArDescription}
            />
          </div>
          {/* English Question */}
          <div className="relative w-full">
            <DashboardTextEditor
              title={t("enDetails")}
              body={enDescription}
              setBody={setEnDescription}
            />
          </div>
        </div>

        <div className="mt-4">
          <DashboardButton titleAr="حفظ" titleEn="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default EditTerms;

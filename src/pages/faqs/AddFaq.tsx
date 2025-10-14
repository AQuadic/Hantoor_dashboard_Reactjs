import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardTextEditor from "@/components/general/DashboardTextEditor";
import DashboardInput from "@/components/general/DashboardInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createFAQ, CreateFAQPayload } from "@/api/faq/addFaq";
import {
  getCountries,
  CountriesResponse,
  Country,
} from "@/api/countries/getCountry";

const AddFaq = () => {
  const { t } = useTranslation("questions");

  // Form state
  const [arQuestion, setArQuestion] = useState("");
  const [enQuestion, setEnQuestion] = useState("");
  const [arBody, setArBody] = useState("");
  const [enBody, setEnBody] = useState("");
  const [countryId, setCountryId] = useState<string | undefined>();
  const [type] = useState<"Frequent Questions" | "Technical Support Questions">(
    "Frequent Questions"
  );
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();
  const { data: countriesData, isLoading: countriesLoading } =
    useQuery<CountriesResponse>({
      queryKey: ["countries"],
      queryFn: () => getCountries(1),
    });

  const handleSubmit = async () => {
    if (!countryId) {
      toast.dismiss();
      toast.error(t("selectCountry"));
      return;
    }
    if (
      !arQuestion.trim() ||
      !enQuestion.trim() ||
      !arBody.trim() ||
      !enBody.trim()
    ) {
      toast.dismiss();
      toast.error(t("pleaseFillAllFields"));
      return;
    }

    const payload: CreateFAQPayload = {
      country_id: countryId,
      type,
      question: { ar: arQuestion, en: enQuestion },
      answer: { ar: arBody, en: enBody },
    };

    try {
      const result = await createFAQ(payload);

      if (result) {
        toast.success(t("addedSuccessfully"));
        setArQuestion("");
        setEnQuestion("");
        setArBody("");
        setEnBody("");
        setCountryId(undefined);
        setErrors({});
        navigate("/faqs");
      } else {
        toast.error(t("Something went wrong"));
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "errors" in err) {
        const errorObj = err as { errors: Record<string, string[]> };
        setErrors(errorObj.errors);
        const errorMessages = Object.entries(errorObj.errors)
          .map(([key, msgs]) => `${key}: ${msgs.join(", ")}`)
          .join("\n");
        toast.error(errorMessages);
      } else if (err && typeof err === "object" && "message" in err) {
        toast.error(
          (err as { message: string }).message || t("Something went wrong")
        );
      } else {
        toast.error(t("Something went wrong"));
      }
    }
  };

  return (
    <section>
      <DashboardHeader
        titleAr="اضافة سؤال جديد"
        titleEn="Add new question"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "الاعدادات", titleEn: "Settings" },
          { titleAr: "اضافة سؤال جديد", titleEn: "Add new question" },
        ]}
      />
      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Country */}
          <div className="md:w-1/2 w-full">
            <Select
              onValueChange={(value) => setCountryId(value)}
              disabled={countriesLoading || !countriesData?.data?.length}
            >
              <SelectTrigger
                className="w-full !h-16 rounded-[12px] mt-4"
                dir="rtl"
              >
                <SelectValue placeholder={t("country")} />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {countriesData?.data.map((country: Country) => (
                  <SelectItem key={country.id} value={country.id.toString()}>
                    {country.name.ar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["country_id"] && (
              <p className="text-red-500 mt-1">
                {errors["country_id"].join(", ")}
              </p>
            )}
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic Question */}
          <div className="relative w-full">
            <DashboardInput
              label={t("arQuestion")}
              value={arQuestion}
              onChange={setArQuestion}
              placeholder={t("writeHere")}
            />
          </div>
          {/* English Question */}
          <div className="relative w-full">
            <DashboardInput
              label={t("enQuestion")}
              value={enQuestion}
              onChange={setEnQuestion}
              placeholder={t("writeHere")}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Arabic Answer */}
          <div className="relative w-full">
            <DashboardTextEditor
              title={t("arAnswer")}
              body={arBody}
              setBody={setArBody}
            />
          </div>
          {/* English Answer */}
          <div className="relative w-full">
            <DashboardTextEditor
              title={t("enAnswer")}
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
    </section>
  );
};

export default AddFaq;

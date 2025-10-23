import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
// DashboardTextEditor removed from this screen per requirements (answers are now sent as fake payloads)
import DashboardInput from "@/components/general/DashboardInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createFAQ, CreateFAQPayload } from "@/api/faq/addFaq";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import {
  Country,
  getAllCountries,
} from "@/api/countries/getCountry";
import { useNavigate } from "react-router";

const AddQuestions = () => {
  const { t } = useTranslation("questions");

  const [countryId, setCountryId] = React.useState<string>();
  // answers removed from UI; we'll send a fake value in the payload
  const [arQuestion, setArQuestion] = React.useState("");
  const [enQuestion, setEnQuestion] = React.useState("");
  const navigate = useNavigate();
  const [, setLoading] = React.useState(false);
  const [type] = useState<"Frequent Questions" | "Technical Support Questions">(
    "Technical Support Questions"
  );
  const [, setErrors] = useState<Record<string, string[]>>({});

  const { data: countriesData, isLoading: countriesLoading } = useQuery({
      queryKey: ["allCountries"],
      queryFn: () => getAllCountries(),
    });

  const handleSubmit = async () => {
    if (!countryId) {
      toast.error(t("setting:pleaseSelectCountry"));
      return;
    }

    // validate required question fields
    if (!arQuestion || arQuestion.trim() === "") {
      toast.error(t("requiredArQuestion"));
      return;
    }
    if (!enQuestion || enQuestion.trim() === "") {
      toast.error(t("requiredEnQuestion"));
      return;
    }

    const payload: CreateFAQPayload = {
      type,
      country_id: countryId,
      question: { ar: arQuestion, en: enQuestion },
      // send a fake answer object with `value` property as required
      answer: {
        ar: JSON.stringify({ value: "" }),
        en: JSON.stringify({ value: "" }),
      },
    };

    setLoading(true);
    try {
      const result = await createFAQ(payload);
      setLoading(false);

      if (result) {
        toast.success(t("addedSuccessfully"));
        setArQuestion("");
        setEnQuestion("");
        setCountryId(undefined);
        setErrors({});
        navigate("/technical-support");
      } else {
        toast.error(t("Something went wrong"));
      }
    } catch (err: any) {
      setLoading(false);
      if (err?.errors) {
        setErrors(err.errors);
        const errorMessages = Object.entries(err.errors)
          .map(([key, msgs]) => `${key}: ${(msgs as string[]).join(", ")}`)
          .join("\n");
        toast.error(errorMessages);
      } else {
        toast.error(err?.message || t("Something went wrong"));
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
          {
            titleAr: "اسئلة الدعم الفني",
            titleEn: "Technical support questions",
          },
          { titleAr: "اضافة سؤال جديد", titleEn: "Add new question" },
        ]}
      />
      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Country */}
          <div className="md:w-1/2 w-full">
            <Select
              onValueChange={(value) => setCountryId(value)}
              disabled={countriesLoading || !countriesData?.length}
            >
              <SelectTrigger
                className="w-full !h-16 rounded-[12px] mt-4"
                dir="rtl"
              >
                <SelectValue placeholder={t("country")} />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {countriesData?.map((country: Country) => (
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

        {/* Answers removed from UI - payload will include a fake answer with `value` */}

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

export default AddQuestions;

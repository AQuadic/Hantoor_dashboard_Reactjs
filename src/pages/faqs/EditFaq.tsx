import { useNavigate, useParams } from "react-router-dom";
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
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { updateFaq } from "@/api/faq/editFaq";
import { getFAQById, FAQ } from "@/api/faq/getFaqById";
import toast from "react-hot-toast";
import {
  CountriesResponse,
  Country,
  getCountries,
} from "@/api/countries/getCountry";
import { useQuery } from "@tanstack/react-query";

const EditFaq = () => {
  const { t } = useTranslation("questions");
  const { id: faqId } = useParams<{ id: string }>();

  const [countryId, setCountryId] = useState<string>("");
  const [arBody, setArBody] = useState("");
  const [enBody, setEnBody] = useState("");
  const [arQuestion, setArQuestion] = useState("");
  const [enQuestion, setEnQuestion] = useState("");
  const navigate = useNavigate();
  const { data: countriesData, isLoading: countriesLoading } =
    useQuery<CountriesResponse>({
      queryKey: ["countries"],
      queryFn: () => getCountries(1),
    });
  useEffect(() => {
    if (!faqId) return;

    const fetchFaq = async () => {
      try {
        const data: FAQ = await getFAQById(faqId);

        setCountryId(data.country_id ? String(data.country_id) : "");
        setArQuestion(data.question?.ar || "");
        setEnQuestion(data.question?.en || "");
        setArBody(data.answer?.ar || "");
        setEnBody(data.answer?.en || "");
      } catch (error) {
        console.error("Failed to fetch FAQ:", error);
      }
    };

    fetchFaq();
  }, [faqId]);

  const handleSave = async () => {
    if (!faqId) {
      alert("FAQ ID is missing");
      return;
    }

    try {
      await updateFaq(faqId, {
        country_id: countryId,
        type: "Frequent Questions",
        question: { ar: arQuestion, en: enQuestion },
        answer: { ar: arBody, en: enBody },
      });
      toast.success(t("editedSuccessfully"));
      navigate("/faqs");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const response = (
          error as {
            response?: { data?: { message?: string; errors?: unknown } };
          }
        ).response;
        const apiMessage =
          response?.data?.message ||
          (response?.data?.errors
            ? JSON.stringify(response.data.errors)
            : "") ||
          "Something went wrong";

        toast.error(apiMessage);
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <section>
      <DashboardHeader
        titleAr="تعديل السؤال"
        titleEn="Edit question"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "الاعدادات", titleEn: "Settings" },
          { titleAr: "تعديل السؤال", titleEn: "Edit question" },
        ]}
      />
      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Country */}
          <div className="md:w-1/2 w-full">
            <Select
              value={countryId}
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
          <DashboardButton titleAr="حفظ" titleEn="Save" onClick={handleSave} />
        </div>
      </div>
    </section>
  );
};

export default EditFaq;

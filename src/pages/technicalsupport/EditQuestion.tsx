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
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CountriesResponse,
  Country,
  getCountries,
} from "@/api/countries/getCountry";
import { useQuery } from "@tanstack/react-query";
import { FAQ, getFAQById } from "@/api/faq/getFaqById";
import { updateFaq, FaqPayload } from "@/api/faq/editFaq";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "@/components/general/Loading";

const EditQuestion = () => {
  const { t } = useTranslation("questions");
  const { id: faqId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // answers removed from UI; we still keep local values for parsing but they won't be editable
  // answers removed from UI and not stored/edited anymore
  const [arQuestion, setArQuestion] = useState("");
  const [enQuestion, setEnQuestion] = useState("");
  const [countryId, setCountryId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { data: countriesData, isLoading: countriesLoading } =
    useQuery<CountriesResponse>({
      queryKey: ["countries"],
      queryFn: () => getCountries(1),
    });

  useEffect(() => {
    if (!faqId) return;

    const fetchFaq = async () => {
      try {
        setLoading(true);
        const data: FAQ = await getFAQById(faqId);

        setCountryId(data.country_id ? String(data.country_id) : "");
        setArQuestion(data.question?.ar || "");
        setEnQuestion(data.question?.en || "");

        // answers are not editable in the UI; we ignore stored answers when editing
      } catch (error) {
        console.error("Failed to fetch FAQ:", error);
        toast.error("Failed to fetch FAQ data");
      } finally {
        setLoading(false);
      }
    };

    fetchFaq();
  }, [faqId]);

  const handleSave = async () => {
    if (!faqId) return;

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

    const payload: FaqPayload = {
      country_id: countryId,
      type: "Technical Support Questions",
      question: { ar: arQuestion, en: enQuestion },
      // send a fake answer object with `value` property as required by API
      answer: {
        ar: JSON.stringify({ value: "" }),
        en: JSON.stringify({ value: "" }),
      },
    };

    try {
      setLoading(true);
      await updateFaq(faqId, payload);
      toast.success(t("editedSuccessfully"));
      navigate("/technical-support");
    } catch {
      toast.error("Failed to update FAQ");
    } finally {
      setLoading(false);
    }
  };

  if (loading || countriesLoading) return <Loading />;

  return (
    <section>
      <DashboardHeader
        titleAr="تعديل السؤال"
        titleEn="Edit Question"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          {
            titleAr: "اسئلة الدعم الفني",
            titleEn: "Technical support questions",
          },
          { titleAr: "تعديل السؤال", titleEn: "Edit Question" },
        ]}
      />
      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
          {/* Country */}
          <div className="md:w-1/2 w-full">
            <Select
              onValueChange={(value) => setCountryId(value)}
              value={countryId}
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

        {/* Answers removed from UI - payload will include a fake answer with `value` */}

        <div className="mt-4">
          <DashboardButton titleAr="حفظ" titleEn="Save" onClick={handleSave} />
        </div>
      </div>
    </section>
  );
};

export default EditQuestion;

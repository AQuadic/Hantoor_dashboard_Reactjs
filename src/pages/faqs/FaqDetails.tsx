import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getFAQById, FAQ } from "@/api/faq/getFaqById";
import NoData from "@/components/general/NoData";
import Loading from "@/components/general/Loading";

interface FaqDetailsProps {
  faqId: number;
}

const FaqDetails: React.FC<FaqDetailsProps> = ({ faqId }) => {
  const { t, i18n } = useTranslation("questions");

  const { data: faq, isLoading, isError } = useQuery<FAQ>({
    queryKey: ["faq", faqId],
    queryFn: () => getFAQById(faqId),
    enabled: !!faqId,
  });

  if (!faqId) return <NoData />
  if (isLoading) return <Loading />
  if (isError || !faq) return <p className="text-center py-4">{t("faqNotFound")}</p>;

  const parseAnswer = (raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && 'value' in parsed) {
        return parsed.value;
      }
      if (Array.isArray(parsed)) {
        return parsed
          .map((p: any) => p.children?.map((c: any) => c.text).join("") || "")
          .join("\n");
      }

      return raw;
    } catch {
      return raw;
    }
  };

    return (
        <div className='py-[13px] container'>
            <h2 className='text-[#2A32F8] text-[23px] font-bold text-center'>{t('questionDetails')}</h2>
            <hr className='my-4'/>
            <div className='mx-8'>
                <h3 className='text-[#2A32F8] text-[19px] font-bold'>{t('question')}</h3>
                <p className="text-[#1E1B1B] text-[19px] mt-[14px]">
                    {faq.question?.[i18n.language as "ar" | "en"] || "-"}
                </p>
            </div>
            <hr className='my-4'/>
            <div className='mx-8'>
                <h3 className='text-[#2A32F8] text-[19px] font-bold'>{t('answer')}</h3>
                <p className="text-[#1E1B1B] text-[19px] mt-[14px]">
                {faq.answer
                    ? parseAnswer(faq.answer[i18n.language as "ar" | "en"])
                    : "-"}
                </p>
            </div>
        </div>
    )
}

export default FaqDetails
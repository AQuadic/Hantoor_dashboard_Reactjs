import { useQuery } from "@tanstack/react-query";
import { getSuggestion, Suggestion } from "@/api/suggestions/getSuggestionsById";
import { useTranslation } from "react-i18next";
import Loading from "@/components/general/Loading";
import NoData from "@/components/general/NoData";

type ContactUsViewProps = {
  id?: number | null;
};

const ContactUsView: React.FC<ContactUsViewProps> = ({ id }) => {
    const { t } = useTranslation("header");

  const { data: suggestion, isLoading } = useQuery<Suggestion>({
    queryKey: ["suggestion", id],
    queryFn: () => getSuggestion(String(id)),
    enabled: !!id, 
  });

  if (isLoading) return <Loading />
  if (!suggestion) return <NoData />

 return (
        <section className='py-[13px] bg-white h-screen'>
            <h1 className='text-[#071739] text-[23px] font-bold text-center'>{t('notes')}</h1>
            <hr className='my-4'/>
            <div className='px-8'>
                <h2 className='text-[#2A32F8] text-[19px] font-bold'>{t('clientData')}</h2>
                <p className='text-[#071739] text-[19px] font-normal mt-3'>{suggestion.name}</p>
                <p className='text-[#071739] text-[19px] font-normal mt-3'>{suggestion.email}</p>
                <p className='text-[#606C7E] text-[15px] font-normal mt-2 rtl:text-right' dir='ltr'>{suggestion.phone}</p>
            </div>
            <hr className='my-4'/>
            <div className='px-8'>
                <h2 className='text-[#2A32F8] text-[19px] font-bold'>{t('notes')}</h2>
                <p className='text-[#071739] text-[19px] font-normal mt-3'>
                    {suggestion.message}
                </p>
            </div>
        </section>
    )
}

export default ContactUsView

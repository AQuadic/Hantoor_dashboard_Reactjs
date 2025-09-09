import DashboardHeader from '../general/dashboard/DashboardHeader'
import SearchBar from '../general/dashboard/SearchBar'
import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'
import { Select, SelectItem} from "@heroui/react";
import { useTranslation } from 'react-i18next';

interface SupportMessagesHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SupportMessagesHeader = ({ searchTerm, setSearchTerm }: SupportMessagesHeaderProps) => {
    const countries = [
        {key: "1", label: "مصر"},
        {key: "2", label: "مصر"},
        {key: "3", label: "مصر"},
        {key: "4", label: "مصر"},
        {key: "5", label: "مصر"},
        {key: "6", label: "مصر"},
    ];
    const { t } = useTranslation("users");
    return (
        <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
        <DashboardHeader
            titleAr="رسائل الدعم"
            titleEn="Support messages"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "رسائل الدعم", titleEn: "Support messages" },
            ]}
        />

        <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
            <div className="flex-1">
            <SearchBar
                termAr={searchTerm}
                termEn={searchTerm}
                placeholderAr={t("searchByName")}
                setTermAr={setSearchTerm}
                setTermEn={setSearchTerm}
                />
            </div>
            <div className="flex-1">
            <DashboardDatePicker />
            </div>
        </div>
            <div className="w-[160px] md:mx-8 mx-0 mt-2.5">
                <Select
                    items={countries}
                    label={t('country')}
                    placeholder={t('all')}
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border !py-6',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(country) => <SelectItem>{country.label}</SelectItem>}
                </Select>
            </div>
        </div>
    )
}

export default SupportMessagesHeader
